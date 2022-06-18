import { Collection } from 'discord.js';
import { Container } from 'inversify';

import { TextCommandMeta } from '../../metadata/TextCommandMeta';

import { Constructor } from '../../../utils';

import { TextArgInstaller } from './TextArgInstaller';
import { TextCommandContext } from '../../models/TextCommandContext';
import { TextArgParserResolver } from './TextArgParserResolver';
import { TextArgParserRegistry } from './TextArgParserRegistry';
import { TextCommandHelpService } from './TextCommandHelpService';


/**
 * Instantiates commands on invocation.
 * 
 * Ever command class is associated with its own TextCommandFactory. On
 * invocation of that command, the factory will do what's necessary to
 * create an instance of that command class suitable for execution.
 */
export class TextCommandFactory {
    /** container to derive sub-containers from */
    parentContainer: Container;
    /** service for looking up parsers based on argument type */
    inferenceService: TextArgParserResolver;
    /** service for easy lookup of parsers */
    parserService: TextArgParserRegistry;
    /** service for extracting help info from commands */
    helpService: TextCommandHelpService;

    /** name of the associated command */
    name: string;
    /** constructor of the associated command class */
    target: Constructor;
    /** description of the associated command */
    description: string;
    /** arguments of the associated command */
    args = new Collection<string, TextArgInstaller>();

    constructor(
        parentContainer: Container,
        meta: TextCommandMeta,
    ) {
        this.parentContainer = parentContainer;
        this.name = meta.name;
        this.target = meta.target;
        this.description = meta.description;

        this.inferenceService = parentContainer.get(TextArgParserResolver);
        this.parserService = parentContainer.get(TextArgParserRegistry);
        this.helpService = new TextCommandHelpService(meta);

        // setup arguments
        for (let [argName, argMeta] of meta.args) {
            const parserType = argMeta.parserType || this.inferenceService.infer(argMeta.type);
            const parser = this.parserService.parserFor(parserType);
            const arg = new TextArgInstaller(argMeta, parser);
            this.args.set(argName, arg);
        }

    }

    /**
     * Parse and install argument values into a container.
     * @param container Container to install into.
     * @param context The command invocation context.
     */
    async installArguments(container: Container, context: TextCommandContext) {
        for (let [_, arg] of this.args) {
            await arg.install(container, context);
        }
    }

    /**
     * Invoke validator methods on the given command instance.
     * @param inst Command instance.
     */
    async runMethodValidators(inst: any) {
        for (let [_, arg] of this.args) {
            for (let methodName of arg.validatorMethods) {
                const callable = inst[methodName];
                if (callable) {
                    await callable.apply(inst);
                }
            }
        }
    }

    /**
     * Create a sub-container for resolving the command instance from.
     * @param context The parent container.
     * @returns A sub-container.
     */
    createSubContainer(context: TextCommandContext) {
        const di = new Container({ skipBaseClassChecks: true });
        di.bind(this.target).to(this.target);
        di.bind<TextCommandContext>("TextCommandContext").toConstantValue(context);
        di.parent = this.parentContainer;
        return di;
    }

    /**
     * Create an instance of the invoked command.
     * @param context A command invocation context.
     * @returns A command instance.
     */
    async create(context: TextCommandContext) {
        // subcontainer config
        const subContainer = this.createSubContainer(context);

        // parse, validate and bind argument values
        await this.installArguments(subContainer, context);

        // resolve command instance
        const inst = subContainer.get(this.target);

        // run instance-method validators
        await this.runMethodValidators(inst);

        return inst;
    }
}


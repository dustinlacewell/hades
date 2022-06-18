import { Collection } from 'discord.js';
import { Container } from 'inversify';

import { TextCommandMeta } from '../../metadata/TextCommandMeta';

import { TextArgInstaller } from './TextArgInstaller';
import { TextCommandContext } from '../../models/TextCommandContext';
import { TextArgParserResolver } from './TextArgParserResolver';
import { TextArgParserRegistry } from './TextArgParserRegistry';


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
    /** the meta of the associated command */
    meta: TextCommandMeta;

    /** service for looking up parsers based on argument type */
    inferenceService: TextArgParserResolver;
    /** service for easy lookup of parsers */
    parserService: TextArgParserRegistry;
    /** arguments of the associated command */
    argInstallers = new Collection<string, TextArgInstaller>();

    constructor(
        parentContainer: Container,
        meta: TextCommandMeta,
    ) {
        this.parentContainer = parentContainer;
        this.meta = meta;

        this.inferenceService = parentContainer.get(TextArgParserResolver);
        this.parserService = parentContainer.get(TextArgParserRegistry);

        // setup arguments
        for (let [argName, argMeta] of meta.args) {
            const parserType = argMeta.parserType || this.inferenceService.infer(argMeta.type);
            const parser = this.parserService.parserFor(parserType);
            const arg = new TextArgInstaller(argMeta, parser);
            this.argInstallers.set(argName, arg);
        }
    }

    /**
     * Parse and install argument values into a container.
     * @param container Container to install into.
     * @param context The command invocation context.
     */
    async installArguments(container: Container, context: TextCommandContext) {
        for (let [_, arg] of this.argInstallers) {
            await arg.install(container, context);
        }
    }

    /**
     * Invoke validator methods on the given command instance.
     * @param inst Command instance.
     */
    async runMethodValidators(inst: any) {
        for (let [_, arg] of this.argInstallers) {
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
        const di = this.parentContainer.createChild({ skipBaseClassChecks: true })
        // bind the command class
        di.bind(this.meta.target).toSelf();
        // bind the invocation context
        di.bind<TextCommandContext>("TextCommandContext").toConstantValue(context);
        // connect the containers
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
        const inst = subContainer.get(this.meta.target);

        // run instance-method validators
        await this.runMethodValidators(inst);

        return inst;
    }
}


import { Collection } from 'discord.js';
import { Container } from 'inversify';

import { TextCommandMeta } from '../metadata/TextCommandMeta';

import { Constructor } from '../../utils';

import { TextArgumentInstaller } from './TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { InferenceService } from '../services/InferenceService';
import { ParserRegistry } from '../services/ParserRegistry';
import { TextCommandHelpService } from '../services/TextCommandHelpService';


export class TextCommandFactory {
    parentContainer: Container;
    inferenceService: InferenceService;
    parserService: ParserRegistry;
    helpService: TextCommandHelpService;

    name: string;
    target: Constructor;
    description: string;
    args = new Collection<string, TextArgumentInstaller>();

    constructor(
        parentContainer: Container,
        meta: TextCommandMeta,
    ) {
        this.parentContainer = parentContainer;
        this.name = meta.name;
        this.target = meta.target;
        this.description = meta.description;

        this.inferenceService = parentContainer.get(InferenceService);
        this.parserService = parentContainer.get(ParserRegistry);
        this.helpService = new TextCommandHelpService(this);

        // setup arguments
        for (let [argName, argMeta] of meta.args) {
            const parserType = argMeta.parserType || this.inferenceService.infer(argMeta.type);
            const parser = this.parserService.parserFor(parserType);
            const arg = new TextArgumentInstaller(argMeta, parser);
            this.args.set(argName, arg);
        }

    }

    async installArguments(container: Container, context: TextCommandContext) {
        for (let [_, arg] of this.args) {
            await arg.install(container, context);
        }
    }

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

    createSubContainer(context: TextCommandContext) {
        const di = new Container({ skipBaseClassChecks: true });
        di.bind(this.target).to(this.target);
        di.bind<TextCommandContext>("TextCommandContext").toConstantValue(context);
        di.parent = this.parentContainer;
        return di;
    }

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


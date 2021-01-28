import { Collection } from 'discord.js';
import { Container } from 'inversify';

import { CommandMeta } from '../meta';
import HelpService from '../services/HelpService';
import InferenceService from '../services/InferenceService';
import ParserService from '../services/ParserService';
import { Constructor } from '../utils';
import Argument from './Argument';
import CommandContext from './CommandContext';


export default class CommandFactory {
    parentContainer: Container;

    helpService: HelpService;
    inferenceService: InferenceService;
    parserService: ParserService;

    name: string;
    target: Constructor;
    description: string;
    args = new Collection<string, Argument>();

    constructor(
        parentContainer: Container,
        meta: CommandMeta,
    ) {
        this.parentContainer = parentContainer;

        console.log(`COMMAND FACTORY: ${meta.target.name}`);
        this.name = meta.name;
        this.target = meta.target;
        this.description = meta.description;

        this.helpService = new HelpService(this);
        this.inferenceService = parentContainer.get(InferenceService);
        this.parserService = parentContainer.get(ParserService);

        // setup arguments
        for (let [argName, argMeta] of meta.args) {
            console.log(`INFERRING ARG: ${argName} : ${argMeta.type?.name}`)
            const parserType = argMeta.parserType || this.inferenceService.infer(argMeta.type);
            const parser = this.parserService.parserFor(parserType);
            const arg = new Argument(argMeta, parser);
            this.args.set(argName, arg);
        }

    }

    async installArguments(container: Container, context: CommandContext) {
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

    createSubContainer(context: CommandContext) {
        const di = new Container({ skipBaseClassChecks: true });
        di.bind(this.target).to(this.target);
        di.bind<CommandContext>("CommandContext").toConstantValue(context);
        di.parent = this.parentContainer;
        return di;
    }

    async create(context: CommandContext) {
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


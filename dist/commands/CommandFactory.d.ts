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
    args: Collection<string, Argument>;
    constructor(parentContainer: Container, meta: CommandMeta);
    installArguments(container: Container, context: CommandContext): Promise<void>;
    runMethodValidators(inst: any): Promise<void>;
    createSubContainer(context: CommandContext): Container;
    create(context: CommandContext): Promise<any>;
}

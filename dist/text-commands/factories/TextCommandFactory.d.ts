import { Collection } from 'discord.js';
import { Container } from 'inversify';
import { TextCommandMeta } from '../metadata/TextCommandMeta';
import { Constructor } from '../../utils';
import { TextArgumentInstaller } from './TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { InferenceService } from '../services/InferenceService';
import { ParserRegistry } from '../services/ParserRegistry';
import { TextCommandHelpService } from '../services/TextCommandHelpService';
export declare class TextCommandFactory {
    parentContainer: Container;
    inferenceService: InferenceService;
    parserService: ParserRegistry;
    helpService: TextCommandHelpService;
    name: string;
    target: Constructor;
    description: string;
    args: Collection<string, TextArgumentInstaller>;
    constructor(parentContainer: Container, meta: TextCommandMeta);
    installArguments(container: Container, context: TextCommandContext): Promise<void>;
    runMethodValidators(inst: any): Promise<void>;
    createSubContainer(context: TextCommandContext): Container;
    create(context: TextCommandContext): Promise<any>;
}

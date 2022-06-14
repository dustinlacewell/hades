import { Collection } from 'discord.js';
import { Container } from 'inversify';
import { TextCommandMeta } from '../../metadata/TextCommandMeta';
import { Constructor } from '../../../utils';
import { TextArgInstaller } from './TextArgInstaller';
import { TextCommandContext } from '../../models/TextCommandContext';
import { TextArgParserResolver } from './TextArgParserResolver';
import { TextArgParserRegistry } from './TextArgParserRegistry';
import { TextCommandHelpService } from './TextCommandHelpService';
export declare class TextCommandFactory {
    parentContainer: Container;
    inferenceService: TextArgParserResolver;
    parserService: TextArgParserRegistry;
    helpService: TextCommandHelpService;
    name: string;
    target: Constructor;
    description: string;
    args: Collection<string, TextArgInstaller>;
    constructor(parentContainer: Container, meta: TextCommandMeta);
    installArguments(container: Container, context: TextCommandContext): Promise<void>;
    runMethodValidators(inst: any): Promise<void>;
    createSubContainer(context: TextCommandContext): Container;
    create(context: TextCommandContext): Promise<any>;
}

import { Message } from 'discord.js';
import { TextCommandContext } from '../../models/TextCommandContext';
import { TextParserService } from './TextParserService';
import { TextCommandFactoryRegistry } from '../TextCommandFactory/TextCommandFactoryRegistry';
import { TextCommandHelpService } from '../TextCommandHelpService/TextCommandHelpService';
/**
 * Orchestrates parsing and executing commands.
 *
 * TODO: Actually implement sensible command prefix support.
 *
 */
export declare class TextCommandService {
    /** the command prefix */
    prefix: string;
    /** service for parsing incoming messages */
    parserService: TextParserService;
    /** factories for creating command instances */
    factories: TextCommandFactoryRegistry;
    help: TextCommandHelpService;
    execute(ctx: TextCommandContext): Promise<void>;
    dispatch(msg: Message): void;
}

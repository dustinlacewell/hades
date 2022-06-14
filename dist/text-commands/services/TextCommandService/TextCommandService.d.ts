import { Collection, Message, MessageEmbed } from 'discord.js';
import { TextCommandContext } from '../../models/TextCommandContext';
import { TextCommandFactory } from '../TextCommandFactory/TextCommandFactory';
import { DispatchService } from './TextCommandDispatch';
export declare class TextCommandService {
    prefix: string;
    options: any;
    factories: Collection<string, TextCommandFactory>;
    dispatchService: DispatchService;
    constructor(dispatchService: DispatchService, factories: TextCommandFactory[]);
    execute(ctx: TextCommandContext): Promise<void>;
    dispatch(msg: Message): void;
    helpFor(commandName: string): MessageEmbed;
    commandsEmbed(): MessageEmbed;
}

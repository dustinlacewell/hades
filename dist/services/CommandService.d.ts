import { Collection, Message, MessageEmbed } from 'discord.js';
import CommandContext from '../commands/CommandContext';
import CommandFactory from '../commands/CommandFactory';
import DispatchService from './DispatchService';
export default class CommandService {
    prefix: string;
    options: any;
    factories: Collection<string, CommandFactory>;
    dispatchService: DispatchService;
    constructor(dispatchService: DispatchService, factories: CommandFactory[]);
    execute(ctx: CommandContext): Promise<void>;
    dispatch(msg: Message): void;
    helpFor(commandName: string): MessageEmbed;
    commandsEmbed(): MessageEmbed;
}

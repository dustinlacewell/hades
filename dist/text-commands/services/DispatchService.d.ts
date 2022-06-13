import { ParserOptions } from 'discord-command-parser';
import { Message } from 'discord.js';
import { TextCommandContext } from '../models/TextCommandContext';
export declare class DispatchService {
    consumers: ((ctx: TextCommandContext) => void)[];
    options: Partial<ParserOptions>;
    constructor();
    register(consumer: (ctx: TextCommandContext) => void): void;
    replaceBotMention(msg: Message): void;
    parse(msg: Message): TextCommandContext;
    dispatch(msg: Message): void;
}

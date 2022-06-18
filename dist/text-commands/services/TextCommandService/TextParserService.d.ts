import { ParserOptions } from "discord-command-parser";
import { Message } from "discord.js";
import { TextCommandContext } from "../../models";
export declare type TextParserServiceOptions = {
    prefix?: string;
    allowMention?: boolean;
    parserOptions?: Partial<ParserOptions>;
};
export declare const defaults: TextParserServiceOptions;
export declare class TextParserService {
    options: TextParserServiceOptions;
    constructor(options?: TextParserServiceOptions);
    /**
     * Replace the bot's nickname with the command prefix.
     * @param msg The original invocation Message.
     */
    replaceBotMention(msg: Message): void;
    /**
     * Parse a Discord.js message into a TextCommandContext
     * @param msg The underlying Discord.js Message
     * @returns A new TextCommandText or null
     */
    parse(msg: Message): TextCommandContext | null;
}

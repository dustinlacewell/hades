import { MessageArgumentReader, SuccessfulParsedMessage } from "discord-command-parser";
import { Message } from "discord.js";
/**
 * Carries information about a parsed command invocation.
 */
export declare class TextCommandContext {
    msg: Message;
    body: string;
    args: string[];
    reader: MessageArgumentReader;
    success: boolean;
    command: string;
    constructor(msg: Message, parsed: SuccessfulParsedMessage<Message>);
}

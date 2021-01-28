import { MessageArgumentReader, SuccessfulParsedMessage } from "discord-command-parser";
import { Message } from "discord.js";
export default class CommandContext {
    msg: Message;
    body: string;
    args: string[];
    reader: MessageArgumentReader;
    success: boolean;
    command: string;
    constructor(msg: Message, parsed: SuccessfulParsedMessage<Message>);
}

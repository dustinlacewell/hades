import { ParserOptions } from "discord-command-parser";
import { Message } from "discord.js";
import CommandContext from "../commands/CommandContext";
export default class DispatchService {
    consumers: ((ctx: CommandContext) => void)[];
    options: Partial<ParserOptions>;
    constructor();
    register(consumer: (ctx: CommandContext) => void): void;
    parse(msg: Message): CommandContext;
    dispatch(msg: Message): void;
}

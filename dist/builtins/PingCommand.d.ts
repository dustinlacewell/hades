/// <reference types="discord.js" />
import Command from "../commands/Command";
export default class PingCommand extends Command {
    execute(): Promise<import("discord.js").Message>;
}

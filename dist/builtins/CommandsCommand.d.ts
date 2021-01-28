/// <reference types="discord.js" />
import Command from "../commands/Command";
import CommandService from "../services/CommandService";
export default class CommandsCommand extends Command {
    commandService: CommandService;
    execute(): Promise<import("discord.js").Message>;
}

/// <reference types="discord.js" />
import Command from "../commands/Command";
import CommandService from "../services/CommandService";
export default class HelpCommand extends Command {
    commandName: string;
    commandService: CommandService;
    private helpEmbed;
    validateCommandName(): void;
    execute(): Promise<import("discord.js").Message>;
}

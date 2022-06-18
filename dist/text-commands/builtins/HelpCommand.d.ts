import { TextCommand } from "../models/TextCommand";
import { TextCommandHelpService } from "../services/TextCommandHelpService";
export declare class HelpCommand extends TextCommand {
    commandName: string;
    helpService: TextCommandHelpService;
    private helpEmbed;
    validateCommandName(): void;
    execute(): Promise<import("discord.js").Message<boolean>>;
}

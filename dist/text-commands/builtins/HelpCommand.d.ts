import { TextCommand } from "../models/TextCommand";
import { TextCommandService } from "../services/TextCommandService";
export declare class HelpCommand extends TextCommand {
    commandName: string;
    commandService: TextCommandService;
    private helpEmbed;
    validateCommandName(): void;
    execute(): Promise<import("discord.js").Message<boolean>>;
}

import { TextCommand } from "../models/TextCommand";
import { TextCommandHelpService } from "../services/TextCommandHelpService";
export declare class CommandsCommand extends TextCommand {
    commandService: TextCommandHelpService;
    execute(): Promise<import("discord.js").Message<boolean>>;
}

import { TextCommand } from "../models/TextCommand";
import { TextCommandService } from "../services/TextCommandService/TextCommandService";
export declare class CommandsCommand extends TextCommand {
    commandService: TextCommandService;
    execute(): Promise<import("discord.js").Message<boolean>>;
}

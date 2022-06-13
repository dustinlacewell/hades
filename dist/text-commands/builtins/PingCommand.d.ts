import { TextCommand } from "../models/TextCommand";
export declare class PingCommand extends TextCommand {
    execute(): Promise<import("discord.js").Message<boolean>>;
}

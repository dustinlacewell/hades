import { SlashCommand } from "../models/SlashCommand";
import { Command } from "./Command";
export declare class PingCommand extends SlashCommand {
    execute(): Promise<void>;
    static getRegistrationData(): Command;
}

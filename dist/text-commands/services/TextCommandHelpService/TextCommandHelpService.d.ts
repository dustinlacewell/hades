import { MessageEmbed } from "discord.js";
import { TextCommandHelperRegistry } from "./TextCommandHelperRegistry";
export declare class TextCommandHelpService {
    helpers: TextCommandHelperRegistry;
    getHelpEmbed(command: string): MessageEmbed;
    getCommandsEmbed(): MessageEmbed;
}

import { MessageEmbed } from 'discord.js';
import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandFactory } from '../factories/TextCommandFactory';
export declare class TextCommandHelpService {
    private command;
    constructor(command: TextCommandFactory);
    get name(): string;
    get args(): import("@discordjs/collection").Collection<string, TextArgumentInstaller>;
    get target(): import("../..").Constructor;
    get description(): string;
    getArgTags(): string[];
    getArgUsage(): string;
    getUsage(): string;
    getArgFields(): {
        name: string;
        value: string;
    }[];
    getHelpEmbed(): MessageEmbed;
}

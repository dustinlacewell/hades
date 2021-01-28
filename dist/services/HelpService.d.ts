import { MessageEmbed } from 'discord.js';
import Argument from '../commands/Argument';
import CommandFactory from '../commands/CommandFactory';
export default class HelpService {
    private command;
    constructor(command: CommandFactory);
    get name(): string;
    get args(): import("discord.js").Collection<string, Argument>;
    get target(): import("../utils").Constructor;
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

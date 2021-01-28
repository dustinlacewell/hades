import { MessageEmbed } from 'discord.js';

import Argument from '../commands/Argument';
import CommandFactory from '../commands/CommandFactory';


export default class HelpService {
    constructor(private command: CommandFactory) { }

    get name() { return this.command.name.trim(); }
    get args() { return this.command.args; }
    get target() { return this.command.target; }
    get description() { return this.command.description.trim(); }

    getArgTags() {
        return this.args.map(a => `[*${a.name}*]`);
    }

    getArgUsage() {
        return this.getArgTags().join(" ");
    }

    getUsage() {
        return `**${this.name} ${this.getArgUsage()}** `;
    }

    getArgFields() {
        return this.args.map((arg: Argument) => {
            const description = arg.description || arg.parser.description || "";
            const value = `*${arg.parser.name}*\n${description} `.trim();
            return { name: arg.name, value };
        });
    }

    getHelpEmbed() {
        let desc = this.getUsage()

        if (this.description) {
            desc = desc + "\n" + this.description;
        }

        const embed = new MessageEmbed()
            .setDescription(desc)
            .addFields(this.getArgFields());
        return embed;
    }
}

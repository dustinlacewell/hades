import { MessageEmbed } from 'discord.js';
import { TextCommandMeta } from '../../metadata';

import { TextArgInstaller } from './TextArgInstaller';


/**
 * Extracts help information from a command.
 */
export class TextCommandHelpService {
    constructor(private meta: TextCommandMeta) { }

    get name() { return this.meta.name.trim(); }
    get args() { return this.meta.args; }
    get target() { return this.meta.target; }
    get description() { return this.meta.description.trim(); }

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
        return this.args.map((arg: TextArgInstaller) => {
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

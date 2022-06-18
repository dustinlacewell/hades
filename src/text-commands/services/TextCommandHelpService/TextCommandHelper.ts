import { MessageEmbed } from 'discord.js';
import { TextArgMeta, TextCommandMeta } from '../../metadata';


/**
 * Extracts help information from a command meta.
 */
export class TextCommandHelper {
    constructor(private meta: TextCommandMeta) { }

    get name() { return this.meta.name.trim(); }
    get args() { return this.meta.args; }
    get target() { return this.meta.target; }
    get description() { return this.meta.description?.trim(); }

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
        return this.args.map((arg: TextArgMeta) => {
            // TODO: figure out how to get at parser for arg (ParserRegistry?)
            const parserType = arg.parserType?.name || "string";
            const description = arg.description || /* arg.parser.description || */ "";
            const value = `*${parserType}*\n${description} `.trim();
            return { name: arg.name, value };
        });
    }

    public getHelpEmbed() {
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextCommandHelper = void 0;
const discord_js_1 = require("discord.js");
/**
 * Extracts help information from a command meta.
 */
class TextCommandHelper {
    constructor(meta) {
        this.meta = meta;
    }
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
        return this.args.map((arg) => {
            // TODO: figure out how to get at parser for arg (ParserRegistry?)
            const description = arg.description || /* arg.parser.description || */ "";
            const value = `*${arg.parserType.name}*\n${description} `.trim();
            return { name: arg.name, value };
        });
    }
    getHelpEmbed() {
        let desc = this.getUsage();
        if (this.description) {
            desc = desc + "\n" + this.description;
        }
        const embed = new discord_js_1.MessageEmbed()
            .setDescription(desc)
            .addFields(this.getArgFields());
        return embed;
    }
}
exports.TextCommandHelper = TextCommandHelper;
//# sourceMappingURL=TextCommandHelper.js.map
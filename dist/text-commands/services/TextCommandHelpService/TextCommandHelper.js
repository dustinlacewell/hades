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
    get description() { var _a; return (_a = this.meta.description) === null || _a === void 0 ? void 0 : _a.trim(); }
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
            var _a;
            // TODO: figure out how to get at parser for arg (ParserRegistry?)
            const parserType = ((_a = arg.parserType) === null || _a === void 0 ? void 0 : _a.name) || "string";
            const description = arg.description || /* arg.parser.description || */ "";
            const value = `*${parserType}*\n${description} `.trim();
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
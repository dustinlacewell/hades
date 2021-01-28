"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class HelpService {
    constructor(command) {
        this.command = command;
    }
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
        return this.args.map((arg) => {
            const description = arg.description || arg.parser.description || "";
            const value = `*${arg.parser.name}*\n${description} `.trim();
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
exports.default = HelpService;
//# sourceMappingURL=HelpService.js.map
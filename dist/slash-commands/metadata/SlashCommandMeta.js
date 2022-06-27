"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandMeta = void 0;
const discord_js_1 = require("discord.js");
const SlashArgMeta_1 = require("./SlashArgMeta");
/**
 * Decorator metadata for @command
 */
class SlashCommandMeta {
    constructor() {
        this.args = new discord_js_1.Collection();
    }
    getArgMeta(name) {
        let meta = this.args.get(name);
        if (meta === undefined) {
            meta = new SlashArgMeta_1.SlashArgMeta();
            this.args.set(name, meta);
        }
        return meta;
    }
}
exports.SlashCommandMeta = SlashCommandMeta;
//# sourceMappingURL=SlashCommandMeta.js.map
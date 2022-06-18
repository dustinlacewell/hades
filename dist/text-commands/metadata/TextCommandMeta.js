"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextCommandMeta = void 0;
const discord_js_1 = require("discord.js");
const TextArgMeta_1 = require("./TextArgMeta");
/**
 * Decorator metadata for @command
 */
class TextCommandMeta {
    constructor() {
        this.args = new discord_js_1.Collection();
    }
    getArgMeta(name) {
        let meta = this.args.get(name);
        if (meta === undefined) {
            meta = new TextArgMeta_1.TextArgMeta();
            this.args.set(name, meta);
        }
        return meta;
    }
    addValidatorMethod(argName, methodName) {
        const arg = this.getArgMeta(argName);
        return arg.validatorMethods.add(methodName);
    }
}
exports.TextCommandMeta = TextCommandMeta;
//# sourceMappingURL=TextCommandMeta.js.map
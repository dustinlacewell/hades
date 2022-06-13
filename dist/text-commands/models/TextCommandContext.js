"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextCommandContext = void 0;
/**
 * Carries information about a parsed command invocation.
 */
class TextCommandContext {
    constructor(msg, parsed) {
        this.msg = msg;
        this.command = parsed.command;
        this.body = parsed.body;
        this.args = parsed.arguments;
        this.reader = parsed.reader;
        this.success = parsed.success;
    }
}
exports.TextCommandContext = TextCommandContext;
//# sourceMappingURL=TextCommandContext.js.map
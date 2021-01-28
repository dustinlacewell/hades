"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandContext {
    constructor(msg, parsed) {
        this.msg = msg;
        this.command = parsed.command;
        this.body = parsed.body;
        this.args = parsed.arguments;
        this.reader = parsed.reader;
        this.success = parsed.success;
    }
}
exports.default = CommandContext;
//# sourceMappingURL=CommandContext.js.map
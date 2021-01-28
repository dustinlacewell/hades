"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArgError extends Error {
    constructor(msg, showHelp = true) {
        super(msg);
        this.showHelp = showHelp;
    }
}
exports.default = ArgError;
//# sourceMappingURL=ArgError.js.map
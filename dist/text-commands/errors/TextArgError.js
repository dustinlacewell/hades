"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextArgError = void 0;
/**
 * An error that occurs when a text command is called with invalid arguments.
 *
 * The optional `showHelp` property determines whether the help message should be shown
 * to the user.
 */
class TextArgError extends Error {
    constructor(msg, showHelp = true) {
        super(msg);
        this.showHelp = showHelp;
    }
}
exports.TextArgError = TextArgError;
//# sourceMappingURL=TextArgError.js.map
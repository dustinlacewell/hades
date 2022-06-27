"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashArgError = void 0;
/**
 * An error that occurs when a slash command is called with invalid arguments.
 *
 * The optional `showHelp` property determines whether the help message should be shown
 * to the user.
 */
class SlashArgError extends Error {
    constructor(msg, showHelp = true) {
        super(msg);
        this.showHelp = showHelp;
    }
}
exports.SlashArgError = SlashArgError;
//# sourceMappingURL=SlashArgError.js.map
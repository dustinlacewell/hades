/**
 * An error that occurs when a text command is called with invalid arguments.
 *
 * The optional `showHelp` property determines whether the help message should be shown
 * to the user.
 */
export declare class TextArgError extends Error {
    showHelp: boolean;
    constructor(msg: string, showHelp?: boolean);
}

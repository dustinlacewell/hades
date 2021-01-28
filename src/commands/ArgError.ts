export default class ArgError extends Error {
    showHelp: boolean;

    constructor(msg: string, showHelp = true) {
        super(msg);
        this.showHelp = showHelp;
    }
}

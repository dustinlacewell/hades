"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextArgMeta = void 0;
/**
 * Decorator metdata for command arguments.
 */
class TextArgMeta {
    constructor() {
        this.validatorMethods = new Set();
        this.validatorInstallers = [];
    }
}
exports.TextArgMeta = TextArgMeta;
//# sourceMappingURL=TextArgMeta.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
const inversify_1 = require("inversify");
const metadata_1 = require("../metadata");
const SlashArgParser_1 = require("../parsers/SlashArgParser");
/**
 * Sets the Parser to use for an argument.
 * @param parserClass The Parser to use.
 */
function parser(parserClass) {
    return (target, key) => {
        if (key) {
            const constructable = target;
            const argMeta = (0, metadata_1.getSlashArgMeta)(constructable.constructor, key);
            argMeta.parserType = parserClass;
        }
        else {
            const ctor = target;
            if (!(ctor.prototype instanceof SlashArgParser_1.SlashArgParser)) {
                throw new Error(`@parser decorated class ${ctor.name} doesn't extend Parser.`);
            }
            (0, metadata_1.registerSlashParser)(ctor);
            return (0, inversify_1.injectable)()(target);
        }
    };
}
exports.parser = parser;
//# sourceMappingURL=parser.js.map
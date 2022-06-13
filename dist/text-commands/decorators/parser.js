"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
const inversify_1 = require("inversify");
const metadata_1 = require("../metadata");
const Parser_1 = require("../parsers/Parser");
function parser(parserClass) {
    return (target, key) => {
        if (key) {
            const constructable = target;
            const argMeta = (0, metadata_1.getArgMeta)(constructable.constructor, key);
            argMeta.parserType = parserClass;
        }
        else {
            const ctor = target;
            if (!(ctor.prototype instanceof Parser_1.Parser)) {
                throw new Error(`@parser decorated class ${ctor.name} doesn't extend Parser.`);
            }
            (0, metadata_1.registerParser)(ctor);
            return (0, inversify_1.injectable)()(target);
        }
    };
}
exports.parser = parser;
//# sourceMappingURL=parser.js.map
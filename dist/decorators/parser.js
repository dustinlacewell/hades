"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const meta_1 = require("../meta");
const Parser_1 = __importDefault(require("../parsers/Parser"));
function parser(parserClass) {
    return (target, key) => {
        if (key) {
            const constructable = target;
            const argMeta = meta_1.getArgMeta(constructable.constructor, key);
            argMeta.parserType = parserClass;
        }
        else {
            const ctor = target;
            if (!(ctor.prototype instanceof Parser_1.default)) {
                throw new Error(`@parser decorated class ${ctor.name} doesn't extend Parser.`);
            }
            meta_1.registerParser(ctor);
            return inversify_1.injectable()(target);
        }
    };
}
exports.default = parser;
//# sourceMappingURL=parser.js.map
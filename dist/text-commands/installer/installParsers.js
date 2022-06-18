"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installParsers = void 0;
const metadata_1 = require("../metadata");
const parsers_1 = require("../parsers");
/**
 * Binds all @parser classes.
 * @param container HadesContainer to use.
 */
const installParsers = (container) => {
    const parserMetas = (0, metadata_1.getTextParserMetas)();
    for (let meta of parserMetas) {
        container.bind(parsers_1.TextArgParser).to(meta.type);
        container.bind(meta.type).to(meta.type);
    }
};
exports.installParsers = installParsers;
//# sourceMappingURL=installParsers.js.map
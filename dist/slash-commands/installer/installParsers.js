"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installParsers = void 0;
const api_1 = require("../metadata/api");
const SlashArgParser_1 = require("../parsers/SlashArgParser");
/**
 * Binds all @parser classes.
 * @param container HadesContainer to use.
 */
const installParsers = (container) => {
    const parserMetas = (0, api_1.getSlashParserMetas)();
    for (let meta of parserMetas) {
        container.bind(SlashArgParser_1.SlashArgParser).to(meta.type);
        container.bind(meta.type).to(meta.type);
    }
};
exports.installParsers = installParsers;
//# sourceMappingURL=installParsers.js.map
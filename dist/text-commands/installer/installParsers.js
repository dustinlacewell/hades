"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installParsers = void 0;
const metadata_1 = require("../metadata");
const parsers_1 = require("../parsers");
const installParsers = (container) => {
    const parserMetas = (0, metadata_1.getParserMetas)();
    for (let meta of parserMetas) {
        container.bind(parsers_1.Parser).to(meta.type);
        container.bind(meta.type).to(meta.type);
    }
};
exports.installParsers = installParsers;
//# sourceMappingURL=installParsers.js.map
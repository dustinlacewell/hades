"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDefaultMappedTypes = exports.defaultMappedTypes = void 0;
const parsers_1 = require("../parsers");
exports.defaultMappedTypes = [
    [String, parsers_1.StringParser],
];
/**
 * Binds which Parsers to use for what argument types, by default.
 * @param container HadesContainer to use.
 * @param mappedTypes Type mappings.
 */
const installDefaultMappedTypes = (container, mappedTypes) => {
    mappedTypes.forEach(pair => {
        container.bind('MappedTypes').toConstantValue(pair);
    });
};
exports.installDefaultMappedTypes = installDefaultMappedTypes;
//# sourceMappingURL=installDefaultMappedTypes.js.map
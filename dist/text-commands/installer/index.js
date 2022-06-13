"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installTextCommands = void 0;
const installCommandFactories_1 = require("./installCommandFactories");
const installDefaultMappedTypes_1 = require("./installDefaultMappedTypes");
const installParsers_1 = require("./installParsers");
const installTextCommands = (container) => {
    (0, installDefaultMappedTypes_1.installDefaultMappedTypes)(container);
    (0, installParsers_1.installParsers)(container);
    (0, installCommandFactories_1.installCommandFactories)(container);
};
exports.installTextCommands = installTextCommands;
//# sourceMappingURL=index.js.map
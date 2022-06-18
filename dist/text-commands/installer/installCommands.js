"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installCommands = void 0;
const TextCommandFactory_1 = require("../services/TextCommandFactory/TextCommandFactory");
const metadata_1 = require("../metadata");
const TextCommandHelper_1 = require("../services/TextCommandHelpService/TextCommandHelper");
const installCommandFactory = (container, meta) => {
    const factory = new TextCommandFactory_1.TextCommandFactory(container, meta);
    container
        .bind(TextCommandFactory_1.TextCommandFactory)
        .toConstantValue(factory);
};
const installCommandFactories = (container, metas) => {
    metas.forEach(meta => installCommandFactory(container, meta));
};
const installCommandHelper = (container, meta) => {
    const helper = new TextCommandHelper_1.TextCommandHelper(meta);
    container
        .bind(TextCommandHelper_1.TextCommandHelper)
        .toConstantValue(helper);
};
const installCommandHelpers = (container, metas) => {
    metas.forEach(meta => installCommandHelper(container, meta));
};
/**
 * Binds TextCommandFactory instances for each @command
 * @param container The HadesContainer to use.
 */
const installCommands = (container) => {
    const metas = (0, metadata_1.getTextCommandMetas)();
    installCommandFactories(container, metas);
    installCommandHelpers(container, metas);
};
exports.installCommands = installCommands;
//# sourceMappingURL=installCommands.js.map
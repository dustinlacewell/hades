"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installCommands = void 0;
const api_1 = require("../metadata/api");
const SlashCommandFactory_1 = require("../services/SlashCommandFactory/SlashCommandFactory");
const installCommandFactory = (container, meta) => {
    const factory = new SlashCommandFactory_1.SlashCommandFactory(container, meta);
    container
        .bind(SlashCommandFactory_1.SlashCommandFactory)
        .toConstantValue(factory);
};
const installCommandFactories = (container, metas) => {
    metas.forEach(meta => installCommandFactory(container, meta));
};
/**
 * Binds SlashCommandFactory instances for each @command
 * @param container The HadesContainer to use.
 */
const installCommands = (container) => {
    const metas = (0, api_1.getSlashCommandMetas)();
    installCommandFactories(container, metas);
    // installCommandHelpers(container, metas)
};
exports.installCommands = installCommands;
//# sourceMappingURL=installCommands.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installCommandFactories = void 0;
const TextCommandFactory_1 = require("../services/TextCommandFactory/TextCommandFactory");
const metadata_1 = require("../metadata");
const installCommandFactories = (container) => {
    const commandMetas = (0, metadata_1.getTextCommandMetas)();
    for (let meta of commandMetas.values()) {
        const factory = new TextCommandFactory_1.TextCommandFactory(container, meta);
        container
            .bind(TextCommandFactory_1.TextCommandFactory)
            .toConstantValue(factory);
    }
};
exports.installCommandFactories = installCommandFactories;
//# sourceMappingURL=installCommandFactories.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const inversify_config_injection_1 = require("inversify-config-injection");
const CommandFactory_1 = __importDefault(require("./commands/CommandFactory"));
const meta_1 = require("./meta");
const parsers_1 = require("./parsers");
const Parser_1 = __importDefault(require("./parsers/Parser"));
class HadesContainer extends inversify_1.Container {
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { skipBaseClassChecks: true }));
        this.bind(HadesContainer).toConstantValue(this);
        this.loadConfigurationModule();
        this.loadDecoratorSupport();
        this.bindDefaultMappedTypes();
        this.bindDecoratedParsers();
        this.bindCommandFactories();
    }
    bindCommandFactories() {
        const metas = meta_1.getCommandMetas();
        for (let meta of metas.array()) {
            const factory = new CommandFactory_1.default(this, meta);
            this.bind(CommandFactory_1.default)
                .toConstantValue(factory);
        }
    }
    bindDecoratedParsers() {
        for (let meta of meta_1.getParserMetas()) {
            this.bind(Parser_1.default).to(meta.type);
            this.bind(meta.type).to(meta.type);
        }
    }
    loadDecoratorSupport() {
        this.load(inversify_binding_decorators_1.buildProviderModule());
    }
    loadConfigurationModule() {
        const configBinder = new inversify_config_injection_1.EagerBinder({ prefix: 'cfg' });
        const configCallback = configBinder.getModuleFunction();
        const configModule = new inversify_1.ContainerModule(configCallback);
        this.load(configModule);
    }
    bindDefaultMappedTypes() {
        [
            [String, parsers_1.StringParser],
            [Number, parsers_1.IntegerParser],
            [discord_js_1.Channel, parsers_1.ChannelParser],
            [discord_js_1.User, parsers_1.UserParser],
            [discord_js_1.Role, parsers_1.RoleParser],
            [discord_js_1.GuildChannel, parsers_1.GuildChannelParser],
            [discord_js_1.GuildMember, parsers_1.MemberParser],
        ].forEach(pair => this.bind('MappedTypes').toConstantValue(pair));
    }
}
exports.default = HadesContainer;
//# sourceMappingURL=HadesContainer.js.map
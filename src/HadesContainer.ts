import { Channel, GuildChannel, GuildMember, Role, User } from 'discord.js';
import { Container, ContainerModule, interfaces } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { EagerBinder } from 'inversify-config-injection';

import CommandFactory from './commands/CommandFactory';
import { getCommandMetas, getParserMetas } from './meta';
import { ChannelParser, GuildChannelParser, IntegerParser, MemberParser, RoleParser, StringParser, UserParser } from './parsers';
import Parser from './parsers/Parser';


export default class HadesContainer extends Container {
    constructor(options?: interfaces.ContainerOptions) {
        super({ ...options, skipBaseClassChecks: true });
        this.bind(HadesContainer).toConstantValue(this);
        this.loadConfigurationModule();
        this.loadDecoratorSupport();
        this.bindDefaultMappedTypes();
        this.bindDecoratedParsers();
        this.bindCommandFactories();
    }

    private bindCommandFactories() {
        const metas = getCommandMetas();
        for (let meta of metas.array()) {
            const factory = new CommandFactory(this, meta);
            this.bind<CommandFactory>(CommandFactory)
                .toConstantValue(factory);
        }
    }

    private bindDecoratedParsers() {
        for (let meta of getParserMetas()) {
            this.bind(Parser).to(meta.type);
            this.bind(meta.type).to(meta.type);
        }
    }

    private loadDecoratorSupport() {
        this.load(buildProviderModule());
    }

    private loadConfigurationModule() {
        const configBinder = new EagerBinder({ prefix: 'cfg' });
        const configCallback = configBinder.getModuleFunction();
        const configModule = new ContainerModule(configCallback);
        this.load(configModule);
    }

    private bindDefaultMappedTypes() {
        [
            [String, StringParser],
            [Number, IntegerParser],
            [Channel, ChannelParser],
            [User, UserParser],
            [Role, RoleParser],
            [GuildChannel, GuildChannelParser],
            [GuildMember, MemberParser],
        ].forEach(
            pair => this.bind('MappedTypes').toConstantValue(pair)
        );
    }
}

import { Collection, Message, MessageEmbed } from 'discord.js';
import { inject, multiInject } from 'inversify';

import CommandContext from '../commands/CommandContext';
import CommandFactory from '../commands/CommandFactory';
import singleton from '../decorators/singleton';
import ArgError from '../commands/ArgError';
import DispatchService from './DispatchService';


@singleton(CommandService)
export default class CommandService {
    prefix: string;
    options: any;
    factories: Collection<string, CommandFactory>;
    dispatchService: DispatchService;

    constructor(
        @inject(DispatchService) dispatchService: DispatchService,
        @multiInject(CommandFactory) factories: CommandFactory[]
    ) {
        // store command factories
        this.factories = new Collection<string, CommandFactory>();
        for (let factory of factories) {
            const name = factory.name;
            this.factories.set(name, factory);
        }

        // register with dispatch service
        this.dispatchService = dispatchService;
        this.dispatchService.register(ctx => {
            this.execute(ctx)
        });
    }

    async execute(ctx: CommandContext) {
        const factory = this.factories.get(ctx.command);

        if (factory) {
            try {
                const command = await factory.create(ctx);
                await command.execute();
            } catch (e: unknown) {
                if (e instanceof ArgError) {
                    if (e.showHelp) {
                        ctx.msg.reply(e.message, { embed: this.helpFor(ctx.command) });
                    } else {
                        ctx.msg.reply(e.message);
                    }
                } else {
                    ctx.msg.reply("Erm, uh well something went wrong. Dunno what though.");
                    console.error(e);
                }
            }
        }
    }

    dispatch(msg: Message) {
        this.dispatchService.dispatch(msg);
    }

    helpFor(commandName: string) {
        const factory = this.factories.get(commandName);
        if (factory) {
            return factory.helpService.getHelpEmbed();
        }
    }

    commandsEmbed() {
        const factories = this.factories.array();
        let embed = new MessageEmbed();

        let documentedFactories = factories.filter(
            f => f.args.size > 0 || f.description);

        let undocumentedFactories = factories.filter(
            f => documentedFactories.indexOf(f) == -1);

        documentedFactories.forEach(f => {
            const desc = f.description === undefined ? "*No description.*" : f.description
            embed = embed.addField(f.helpService.getUsage(), desc);
        });

        embed = embed.addField("Other commands:", undocumentedFactories.map(f => f.name).join(", "));

        return embed;
    }
}

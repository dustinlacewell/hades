import { Collection, Message, MessageEmbed } from 'discord.js';
import { inject, multiInject } from 'inversify';

import { TextCommandContext } from '../../models/TextCommandContext';
import { TextCommandFactory } from '../TextCommandFactory/TextCommandFactory';
import { TextArgError } from '../../errors/TextArgError';

import { singleton } from '../../../decorators/singleton';
import { DispatchService } from './TextCommandDispatch';

/**
 * Orchestrates parsing and executing commands.
 * 
 * TODO: Actually implement sensible command prefix support.
 * 
 */
@singleton(TextCommandService)
export class TextCommandService {
    /** the command prefix */
    prefix: string;
    /** TODO: what is this options field for?? */
    options: any;
    /** factories for creating command instances */
    factories: Collection<string, TextCommandFactory>;
    /** service for dispatching commands to listeners */
    dispatchService: DispatchService;

    constructor(
        @inject(DispatchService) dispatchService: DispatchService,
        @multiInject(TextCommandFactory) factories: TextCommandFactory[]
    ) {
        // store command factories
        this.factories = new Collection<string, TextCommandFactory>();
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

    async execute(ctx: TextCommandContext) {
        const factory = this.factories.get(ctx.command);

        if (factory) {
            try {
                const command = await factory.create(ctx);
                await command.execute();
            } catch (e: unknown) {
                if (e instanceof TextArgError) {
                    if (e.showHelp) {
                        ctx.msg.reply({
                            content: e.message,
                            embeds: [this.helpFor(ctx.command)]
                        });
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
        const factories = Array.from(this.factories.values());
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

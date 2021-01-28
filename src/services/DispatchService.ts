import { parse, ParserOptions } from 'discord-command-parser';
import { Message } from 'discord.js';

import CommandContext from '../commands/CommandContext';
import singleton from '../decorators/singleton';


@singleton(DispatchService)
export default class DispatchService {
    consumers: ((ctx: CommandContext) => void)[];
    options: Partial<ParserOptions>;

    constructor() {
        this.consumers = [];
        this.options = {
            allowSpaceBeforeCommand: true,
            ignorePrefixCase: true
        };
    }

    register(consumer: (ctx: CommandContext) => void) {
        this.consumers.push(consumer);
    }

    parse(msg: Message) {
        const botname = `<@!${msg.client.user.id}>`;
        msg.content = msg.content.replace(botname, "!");
        const parsed = parse(msg, "!", this.options);

        if (!parsed.success) {
            return;
        };

        return new CommandContext(msg, parsed);
    }

    dispatch(msg: Message) {
        const ctx = this.parse(msg);

        if (ctx == null) {
            return;
        }

        for (let consumer of this.consumers) {
            consumer(ctx);
        }
    }
}

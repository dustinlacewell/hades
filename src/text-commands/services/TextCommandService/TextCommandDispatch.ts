import { parse, ParserOptions } from 'discord-command-parser';
import { Message } from 'discord.js';

import { TextCommandContext } from '../../models/TextCommandContext';
import { singleton } from '../../../decorators/singleton';


@singleton(DispatchService)
export class DispatchService {
    consumers: ((ctx: TextCommandContext) => void)[];
    options: Partial<ParserOptions>;

    constructor() {
        this.consumers = [];
        this.options = {
            allowSpaceBeforeCommand: true,
            ignorePrefixCase: true
        };
    }

    register(consumer: (ctx: TextCommandContext) => void) {
        this.consumers.push(consumer);
    }

    replaceBotMention(msg: Message) {
        const botname = `<@${msg.client.user.id}> `;
        msg.content = msg.content.replace(botname, "!");
    }

    parse(msg: Message) {
        this.replaceBotMention(msg);
        const parsed = parse(msg, "!", this.options);

        if (!parsed.success) {
            return;
        };

        return new TextCommandContext(msg, parsed);
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

import { parse, ParserOptions } from 'discord-command-parser';
import { Message } from 'discord.js';

import { TextCommandContext } from '../../models/TextCommandContext';
import { singleton } from '../../../decorators/singleton';


/**
 * Dispatches command invocations out to interested paries.
 * 
 * TODO: Why is parsing done here?
 */
@singleton(DispatchService)
export class DispatchService {
    /** collection of registered listeners */
    consumers: ((ctx: TextCommandContext) => void)[];
    /** options for command recognization */
    options: Partial<ParserOptions>;

    constructor() {
        this.consumers = [];
        this.options = {
            allowSpaceBeforeCommand: true,
            ignorePrefixCase: true
        };
    }

    /**
     * Register a consumer to receive command invocations.
     * @param consumer The consumer to register.
     */
    register(consumer: (ctx: TextCommandContext) => void) {
        this.consumers.push(consumer);
    }

    /**
     * Replace the bot's nickname with the command prefix.
     * @param msg The original invocation Message.
     */
    replaceBotMention(msg: Message) {
        const botname = `<@${msg.client.user.id}> `;
        msg.content = msg.content.replace(botname, "!");
    }

    /**
     * Parse a Discord.js message into a TextCommandContext
     * @param msg The underlying Discord.js Message
     * @returns A new TextCommandText
     */
    parse(msg: Message) {
        this.replaceBotMention(msg);
        const parsed = parse(msg, "!", this.options);

        if (!parsed.success) {
            return;
        };

        return new TextCommandContext(msg, parsed);
    }

    /**
     * Dispatch a message to all listeners.
     * @param msg The underlying Discord.js Message
     */
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

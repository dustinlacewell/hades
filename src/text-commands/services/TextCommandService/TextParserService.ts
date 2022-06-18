import { parse, ParserOptions } from "discord-command-parser";
import { Message } from "discord.js";
import { inject, optional } from "inversify";
import { singleton } from "../../../decorators";
import { TextCommandContext } from "../../models";


export type TextParserServiceOptions = {
    prefix?: string,
    allowMention?: boolean,
    parserOptions?: Partial<ParserOptions>,
}

export const defaults: TextParserServiceOptions = {
    prefix: "!",
    allowMention: true,
    parserOptions: {
        allowSpaceBeforeCommand: true,
        ignorePrefixCase: true,
    }
}

@singleton(TextParserService)
export class TextParserService {
    options: TextParserServiceOptions

    constructor(
        @optional()
        @inject("PARSER_OPTIONS")
        options?: TextParserServiceOptions
    ) {
        this.options = {
            ...defaults,
            ...options,
            parserOptions: {
                ...defaults.parserOptions,
                ...options?.parserOptions || {},
            }
        }
    }

    /**
     * Replace the bot's nickname with the command prefix.
     * @param msg The original invocation Message.
     */
    replaceBotMention(msg: Message) {
        const botname = `<@${msg.client.user.id}> `;
        msg.content = msg.content.replace(botname, this.options.prefix);
    }


    /**
     * Parse a Discord.js message into a TextCommandContext
     * @param msg The underlying Discord.js Message
     * @returns A new TextCommandText or null
     */
    parse(msg: Message): TextCommandContext | null {
        if (this.options.allowMention) {
            this.replaceBotMention(msg);
        }

        const parsed = parse(msg, this.options.prefix, this.options.parserOptions);

        if (!parsed.success) {
            return null;
        };

        return new TextCommandContext(msg, parsed);
    }
}
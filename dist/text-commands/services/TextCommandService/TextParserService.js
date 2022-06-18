"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TextParserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextParserService = exports.defaults = void 0;
const discord_command_parser_1 = require("discord-command-parser");
const decorators_1 = require("../../../decorators");
const models_1 = require("../../models");
exports.defaults = {
    prefix: "!",
    allowMention: true,
    parserOptions: {
        allowSpaceBeforeCommand: true,
        ignorePrefixCase: true,
    }
};
let TextParserService = TextParserService_1 = class TextParserService {
    constructor() {
        this.options = exports.defaults;
    }
    // constructor(
    //     options?: TextParserServiceOptions
    // ) {
    //     const { parserOptions, ...rest } = options;
    //     this.options = {
    //         ...defaults,
    //         ...options,
    //         parserOptions: {
    //             ...defaults.parserOptions,
    //             ...options.parserOptions,
    //         }
    //     }
    // }
    /**
     * Replace the bot's nickname with the command prefix.
     * @param msg The original invocation Message.
     */
    replaceBotMention(msg) {
        const botname = `<@${msg.client.user.id}> `;
        msg.content = msg.content.replace(botname, this.options.prefix);
    }
    /**
     * Parse a Discord.js message into a TextCommandContext
     * @param msg The underlying Discord.js Message
     * @returns A new TextCommandText or null
     */
    parse(msg) {
        if (this.options.allowMention) {
            this.replaceBotMention(msg);
        }
        const parsed = (0, discord_command_parser_1.parse)(msg, this.options.prefix, this.options.parserOptions);
        if (!parsed.success) {
            return null;
        }
        ;
        return new models_1.TextCommandContext(msg, parsed);
    }
};
TextParserService = TextParserService_1 = __decorate([
    (0, decorators_1.singleton)(TextParserService_1)
], TextParserService);
exports.TextParserService = TextParserService;
//# sourceMappingURL=TextParserService.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var TextParserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextParserService = exports.defaults = void 0;
const discord_command_parser_1 = require("discord-command-parser");
const inversify_1 = require("inversify");
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
    constructor(options) {
        const { parserOptions } = options, rest = __rest(options, ["parserOptions"]);
        this.options = Object.assign(Object.assign(Object.assign({}, exports.defaults), options), { parserOptions: Object.assign(Object.assign({}, exports.defaults.parserOptions), options.parserOptions) });
    }
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
    (0, decorators_1.singleton)(TextParserService_1),
    __param(0, (0, inversify_1.optional)()),
    __param(0, (0, inversify_1.inject)("PARSER_OPTIONS")),
    __metadata("design:paramtypes", [Object])
], TextParserService);
exports.TextParserService = TextParserService;
//# sourceMappingURL=TextParserService.js.map
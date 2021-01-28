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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const CommandContext_1 = __importDefault(require("./CommandContext"));
const DiscordService_1 = __importDefault(require("../services/DiscordService"));
let Command = class Command {
    get activity() { return this.msg.activity; }
    get application() { return this.msg.application; }
    get args() { return this.context.args; }
    get attachments() { return this.msg.attachments; }
    get body() { return this.context.body; }
    get channel() { return this.msg.channel; }
    get command() { return this.context.command; }
    get createdAt() { return this.msg.createdAt; }
    get createdTimestamp() { return this.msg.createdTimestamp; }
    get deletable() { return this.msg.deletable; }
    get deleted() { return this.msg.deleted; }
    get editable() { return this.msg.editable; }
    get editedAt() { return this.msg.editedAt; }
    get editedTimestamp() { return this.msg.editedTimestamp; }
    get edits() { return this.msg.edits; }
    get embeds() { return this.msg.embeds; }
    get flags() { return this.msg.flags; }
    get guild() { return this.msg.guild; }
    get id() { return this.msg.id; }
    get member() { return this.msg.member; }
    get mentions() { return this.msg.mentions; }
    get msg() { return this.context.msg; }
    get pinnable() { return this.msg.pinnable; }
    get pinned() { return this.msg.pinned; }
    get reactions() { return this.msg.reactions; }
    get reader() { return this.context.reader; }
    get reference() { return this.msg.reference; }
    get system() { return this.msg.system; }
    get tts() { return this.msg.tts; }
    get type() { return this.msg.type; }
    get url() { return this.msg.url; }
    get user() { return this.msg.author; }
    get webhookID() { return this.msg.webhookID; }
    get members() { return this.discord.getMembers(this.guild.id); }
    get categories() { return this.discord.getCategories(this.guild.id); }
    get channels() { return this.discord.getChannels(this.guild.id); }
    get roles() { return this.discord.getRoles(this.guild.id); }
    getMember(memberId) { return this.discord.getMember(this.guild.id, memberId); }
    getOwner() { return this.discord.getOwner(this.guild.id); }
    getChannel(channelId) { return this.discord.getChannel(this.guild.id, channelId); }
    getRole(roleName) { return this.guild.roles.resolve(roleName); }
    awaitReactions(filter, options) {
        return this.msg.awaitReactions(filter, options);
    }
    createReactionCollector(filter, options) {
        return this.msg.createReactionCollector(filter, options);
    }
    delete(options) {
        return this.msg.delete(options);
    }
    edit(content, options) {
        return this.msg.edit(content, options);
    }
    equals(message, rawData) {
        return this.msg.equals(message, rawData);
    }
    fetchWebhook() {
        return this.msg.fetchWebhook();
    }
    crosspost() {
        return this.msg.crosspost();
    }
    fetch(force) {
        return this.msg.fetch(force);
    }
    pin(options) {
        return this.msg.pin(options);
    }
    react(emoji) {
        return this.msg.react(emoji);
    }
    reply(content, options) {
        return this.msg.reply(content, options);
    }
    suppressEmbeds(suppress) {
        return this.msg.suppressEmbeds(suppress);
    }
    unpin(options) {
        return this.msg.unpin(options);
    }
};
__decorate([
    inversify_1.inject('CommandContext'),
    __metadata("design:type", CommandContext_1.default)
], Command.prototype, "context", void 0);
__decorate([
    inversify_1.inject(DiscordService_1.default),
    __metadata("design:type", DiscordService_1.default)
], Command.prototype, "discord", void 0);
Command = __decorate([
    inversify_1.injectable()
], Command);
exports.default = Command;
//# sourceMappingURL=Command.js.map
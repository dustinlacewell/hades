import { inject, injectable } from "inversify";
import { AwaitReactionsOptions, CollectorFilter, MessageEditOptions, ReactionCollectorOptions, StringResolvable, MessageEmbed, MessageOptions, MessageAdditions, Message, EmojiIdentifierResolvable } from "discord.js";

import CommandContext from "./CommandContext";
import DiscordService from "../services/DiscordService";


@injectable()
export default abstract class Command {
    @inject('CommandContext') context: CommandContext;
    @inject(DiscordService) discord: DiscordService;

    abstract execute(): Promise<any>;

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

    getMember(memberId: string) { return this.discord.getMember(this.guild.id, memberId); }
    getOwner() { return this.discord.getOwner(this.guild.id); }
    getChannel(channelId: string) { return this.discord.getChannel(this.guild.id, channelId); }
    getRole(roleName: string) { return this.guild.roles.resolve(roleName); }


    public awaitReactions(filter: CollectorFilter, options?: AwaitReactionsOptions) {
        return this.msg.awaitReactions(filter, options);
    }

    public createReactionCollector(filter: CollectorFilter, options?: ReactionCollectorOptions) {
        return this.msg.createReactionCollector(filter, options);
    }

    public delete(options?: { timeout?: number; reason?: string }) {
        return this.msg.delete(options);
    }

    public edit(content: StringResolvable, options: MessageEditOptions | MessageEmbed) {
        return this.msg.edit(content, options);
    }

    public equals(message: Message, rawData: object) {
        return this.msg.equals(message, rawData);
    }

    public fetchWebhook() {
        return this.msg.fetchWebhook();
    }

    public crosspost() {
        return this.msg.crosspost();
    }

    public fetch(force?: boolean) {
        return this.msg.fetch(force);
    }

    public pin(options?: { reason?: string }) {
        return this.msg.pin(options);
    }

    public react(emoji: EmojiIdentifierResolvable) {
        return this.msg.react(emoji);
    }

    public reply(content: StringResolvable, options?: (MessageOptions & { split?: false }) | MessageAdditions) {
        return this.msg.reply(content, options);
    }

    public suppressEmbeds(suppress?: boolean) {
        return this.msg.suppressEmbeds(suppress);
    }

    public unpin(options?: { reason?: string }) {
        return this.msg.unpin(options);
    }
}

import { inject, injectable } from "inversify";
import { AwaitReactionsOptions, CollectorFilter, MessageEditOptions, ReactionCollectorOptions, MessageEmbed, MessageOptions, Message, EmojiIdentifierResolvable, MessageReaction, User, ReplyMessageOptions } from "discord.js";


import { DiscordService } from "../../services/DiscordService";
import { TextCommandContext } from "./TextCommandContext";


/**
 * Base command class.
 */
@injectable()
export abstract class TextCommand {
    /** information on the current command invocation */
    @inject('TextCommandContext')
    context: TextCommandContext;

    /** service for getting data from discord */
    @inject(DiscordService)
    discord: DiscordService;

    /** main command logic handler */
    abstract execute(): Promise<any>;

    get activity() { return this.msg.activity; }
    get application() { return this.msg.applicationId; }
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
    get webhookID() { return this.msg.webhookId; }

    get members() { return this.discord.getMembers(this.guild.id); }
    get categories() { return this.discord.getCategories(this.guild.id); }
    get channels() { return this.discord.getChannels(this.guild.id); }
    get roles() { return this.discord.getRoles(this.guild.id); }

    getMember(memberId: string) { return this.discord.getMember(this.guild.id, memberId); }
    getOwner() { return this.discord.getOwner(this.guild.id); }
    getChannel(channelId: string) { return this.discord.getChannel(this.guild.id, channelId); }
    getRole(roleName: string) { return this.guild.roles.resolve(roleName); }


    public awaitReactions(filter: CollectorFilter<[MessageReaction, User]>, options?: AwaitReactionsOptions) {
        return this.msg.awaitReactions({ ...options, filter });
    }

    public createReactionCollector(filter: CollectorFilter<[MessageReaction, User]>, options?: ReactionCollectorOptions) {
        return this.msg.createReactionCollector({ ...options, filter });
    }

    public delete() {
        return this.msg.delete();
    }

    public edit(content: string, options: MessageEditOptions | MessageEmbed) {
        return this.msg.edit({ ...options, content });
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

    public pin(reason?: string) {
        return this.msg.pin(reason);
    }

    public react(emoji: EmojiIdentifierResolvable) {
        return this.msg.react(emoji);
    }

    public reply(content: string, options?: ReplyMessageOptions) {
        return this.msg.reply({ ...options, content });
    }

    public suppressEmbeds(suppress?: boolean) {
        return this.msg.suppressEmbeds(suppress);
    }

    public unpin(reason?: string) {
        return this.msg.unpin(reason);
    }
}

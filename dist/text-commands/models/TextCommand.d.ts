import { AwaitReactionsOptions, CollectorFilter, MessageEditOptions, ReactionCollectorOptions, MessageEmbed, Message, EmojiIdentifierResolvable, MessageReaction, User, ReplyMessageOptions } from "discord.js";
import { DiscordService } from "../../services/DiscordService";
import { TextCommandContext } from "./TextCommandContext";
/**
 * Base command class.
 */
export declare abstract class TextCommand {
    /** information on the current command invocation */
    context: TextCommandContext;
    /** service for getting data from discord */
    discord: DiscordService;
    /** main command logic handler */
    abstract execute(): Promise<any>;
    get activity(): import("discord.js").MessageActivity;
    get application(): string;
    get args(): string[];
    get attachments(): import("@discordjs/collection").Collection<string, import("discord.js").MessageAttachment>;
    get body(): string;
    get channel(): import("discord.js").DMChannel | import("discord.js").PartialDMChannel | import("discord.js").NewsChannel | import("discord.js").TextChannel | import("discord.js").ThreadChannel | import("discord.js").VoiceChannel;
    get command(): string;
    get createdAt(): Date;
    get createdTimestamp(): number;
    get deletable(): boolean;
    get deleted(): boolean;
    get editable(): boolean;
    get editedAt(): Date;
    get editedTimestamp(): number;
    get embeds(): MessageEmbed[];
    get flags(): Readonly<import("discord.js").MessageFlags>;
    get guild(): import("discord.js").Guild;
    get id(): string;
    get member(): import("discord.js").GuildMember;
    get mentions(): import("discord.js").MessageMentions;
    get msg(): Message<boolean>;
    get pinnable(): boolean;
    get pinned(): boolean;
    get reactions(): import("discord.js").ReactionManager;
    get reader(): import("discord-command-parser").MessageArgumentReader;
    get reference(): import("discord.js").MessageReference;
    get system(): boolean;
    get tts(): boolean;
    get type(): "DEFAULT" | "RECIPIENT_ADD" | "RECIPIENT_REMOVE" | "CALL" | "CHANNEL_NAME_CHANGE" | "CHANNEL_ICON_CHANGE" | "CHANNEL_PINNED_MESSAGE" | "GUILD_MEMBER_JOIN" | "USER_PREMIUM_GUILD_SUBSCRIPTION" | "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1" | "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2" | "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3" | "CHANNEL_FOLLOW_ADD" | "GUILD_DISCOVERY_DISQUALIFIED" | "GUILD_DISCOVERY_REQUALIFIED" | "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING" | "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING" | "THREAD_CREATED" | "REPLY" | "APPLICATION_COMMAND" | "THREAD_STARTER_MESSAGE" | "GUILD_INVITE_REMINDER" | "CONTEXT_MENU_COMMAND";
    get url(): string;
    get user(): User;
    get webhookID(): string;
    get members(): import("@discordjs/collection").Collection<string, import("discord.js").GuildMember>;
    get categories(): import("@discordjs/collection").Collection<string, import("discord.js").CategoryChannel>;
    get channels(): import("@discordjs/collection").Collection<string, import("discord.js").TextChannel>;
    get roles(): import("@discordjs/collection").Collection<string, import("discord.js").Role>;
    getMember(memberId: string): import("discord.js").GuildMember;
    getOwner(): string;
    getChannel(channelId: string): import("discord.js").GuildBasedChannel;
    getRole(roleName: string): import("discord.js").Role;
    awaitReactions(filter: CollectorFilter<[MessageReaction, User]>, options?: AwaitReactionsOptions): Promise<import("@discordjs/collection").Collection<string, MessageReaction>>;
    createReactionCollector(filter: CollectorFilter<[MessageReaction, User]>, options?: ReactionCollectorOptions): import("discord.js").ReactionCollector;
    delete(): Promise<Message<boolean>>;
    edit(content: string, options: MessageEditOptions | MessageEmbed): Promise<Message<boolean>>;
    equals(message: Message, rawData: object): boolean;
    fetchWebhook(): Promise<import("discord.js").Webhook>;
    crosspost(): Promise<Message<boolean>>;
    fetch(force?: boolean): Promise<Message<boolean>>;
    pin(reason?: string): Promise<Message<boolean>>;
    react(emoji: EmojiIdentifierResolvable): Promise<MessageReaction>;
    reply(content: string, options?: ReplyMessageOptions): Promise<Message<boolean>>;
    suppressEmbeds(suppress?: boolean): Promise<Message<boolean>>;
    unpin(reason?: string): Promise<Message<boolean>>;
}

import { BaseCommandInteraction, Channel, Collection, Emoji, Guild, GuildMember, Message, MessageReaction, Role, Snowflake, User } from 'discord.js';
import { EventService } from './EventService';
import { HadesClient } from './HadesClient';
/**
 * A base service for building bots with Hades.
 *
 * Comes with a HadesClient and EventService. The bot will automatically
 * register with the EventService.
 */
export declare class HadesBotService {
    /**
     * The Discord client.
     */
    client: HadesClient;
    /**
     * The Discord bot token.
     */
    token: String;
    /**
     * Used to receive Discord events.
     */
    eventService: EventService;
    postConstruct(): void;
    /**
     * Connect to Discord.
     * @returns Promise<string>
     */
    login(): Promise<string>;
    onDebug(...args: any[]): Promise<void>;
    onError(...args: any[]): Promise<void>;
    onWarn(...args: any[]): Promise<void>;
    onChannelCreate(channel: Channel): Promise<void>;
    onChannelDelete(channel: Channel): Promise<void>;
    onChannelPinsUpdate(channel: Channel, time: Date): Promise<void>;
    onChannelUpdate(oldChannel: Channel, newChannel: Channel): Promise<void>;
    onReady(): Promise<void>;
    onReconnecting(): Promise<void>;
    onDisconnect(event: CloseEvent): Promise<void>;
    onEmojiCreate(emoji: Emoji): Promise<void>;
    onEmojiDelete(emoji: Emoji): Promise<void>;
    onEmojiUpdate(emoji: Emoji): Promise<void>;
    onGuildBanAdd(guild: Guild, user: User): Promise<void>;
    onGuildBanRemove(guild: Guild, user: User): Promise<void>;
    onGuildCreate(guild: Guild): Promise<void>;
    onGuildDelete(guild: Guild): Promise<void>;
    onGuildUnavailable(guild: Guild): Promise<void>;
    onGuildMemberAdd(member: GuildMember): Promise<void>;
    onGuildMemberAvailable(member: GuildMember): Promise<void>;
    onGuildMemberRemove(member: GuildMember): Promise<void>;
    onGuildMemberSpeaking(member: GuildMember, isSpeaking: boolean): Promise<void>;
    onGuildMemberUpdate(oldMember: GuildMember, newMember: GuildMember): Promise<void>;
    onGuildMembersChunk(members: GuildMember[], guild: Guild): Promise<void>;
    onGuildUpdate(oldGuild: Guild, newGuild: Guild): Promise<void>;
    onInteractionCreate<T extends BaseCommandInteraction>(interaction: T): Promise<void>;
    onMessage<T extends Message>(message: T): Promise<void>;
    onMessageDelete(message: Message): Promise<void>;
    onMessageDeleteBulk(messages: Collection<Snowflake, Message>): Promise<void>;
    onMessageReactionAdd(reaction: MessageReaction, user: User): Promise<void>;
    onMessageReactionRemove(reaction: MessageReaction, user: User): Promise<void>;
    onMessageReactionRemoveAll(message: Message): Promise<void>;
    onMessageUpdate(oldMessage: Message, newMessage: Message): Promise<void>;
    onPresenceUpdate(oldMember: GuildMember, newMember: GuildMember): Promise<void>;
    onTypingStart(channel: Channel, user: User): Promise<void>;
    onTypingStop(channel: Channel, user: User): Promise<void>;
    onRoleCreate(role: Role): Promise<void>;
    onRoleDelete(role: Role): Promise<void>;
    onRoleUpdate(oldRole: Role, newRole: Role): Promise<void>;
    onUserNoteUpdate(user: User, oldNote: string, newNote: string): Promise<void>;
    onUserUpdate(oldUser: User, newUser: User): Promise<void>;
    onVoiceStateUpdate(oldMember: GuildMember, newMember: GuildMember): Promise<void>;
}

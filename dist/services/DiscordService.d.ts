import { ChannelType } from 'discord-api-types/v10';
import { CategoryChannel, GuildBasedChannel, TextChannel } from 'discord.js';
import { HadesClient } from './HadesClient';
/**
 * A service for getting guild information from Discord.
 *
 * @inject client HadesClient The client to use for communicating with Discord.
 */
export declare class DiscordService {
    private client;
    constructor(client: HadesClient);
    /**
     * Get all guilds the bot is in.
     */
    get guilds(): import("@discordjs/collection").Collection<string, import("discord.js").Guild>;
    /**
     * Get the name of a guild.
     * @param guildId The ID of the guild.
     * @returns string | undefined
     */
    getName(guildId: string): string;
    /**
     * Get the members of a guild.
     * @param guildId The ID of the guild.
     * @returns Collection<string, GuildMember> | undefined
     */
    getMembers(guildId: string): import("@discordjs/collection").Collection<string, import("discord.js").GuildMember>;
    /**
     * Get a member of a guild.
     * @param guildId The ID of the guild.
     * @param memberId The ID of the member.
     * @returns GuildMember | undefined
     */
    getMember(guildId: string, memberId: string): import("discord.js").GuildMember;
    /**
     * Get the ID of a guild's owner.
     * @param guildId The ID of the guild.
     * @returns string | undefined
     */
    getOwner(guildId: string): string;
    /**
     * Get channels of a certain type.
     * @param type The type of channel to get.
     * @param guildId The ID of the guild.
     * @returns Collection<string, GuildChannel>
     */
    getChansOf<T extends GuildBasedChannel>(type: ChannelType, guildId: string): import("@discordjs/collection").Collection<string, T>;
    /**
     * Get the channel categories of a guild.
     * @param guildId The ID of the guild.
     * @returns Collection<string, CategoryChannel>
     */
    getCategories(guildId: string): import("@discordjs/collection").Collection<string, CategoryChannel>;
    /**
     * Get the channels of a guild.
     * @param guildId The ID of the guild.
     * @returns Collection<string, TextChannel>
     */
    getChannels(guildId: string): import("@discordjs/collection").Collection<string, TextChannel>;
    /**
     * Get a channel of a guild.
     * @param guildId The ID of the guild.
     * @param channelId The ID of the channel.
     * @returns GuildChannel | undefined
     */
    getChannel(guildId: string, channelId: string): GuildBasedChannel;
    /**
     * Get the roles of a guild.
     * @param guildId The ID of the guild.
     * @returns Collection<string, Role>
     */
    getRoles(guildId: string): import("@discordjs/collection").Collection<string, import("discord.js").Role>;
}

import { ChannelType } from 'discord-api-types/v10';
import { CategoryChannel, GuildBasedChannel, TextChannel } from 'discord.js';
import { HadesClient } from './HadesClient';
export declare class DiscordService {
    private client;
    constructor(client: HadesClient);
    get guilds(): import("@discordjs/collection").Collection<string, import("discord.js").Guild>;
    getName(guildId: string): string;
    getMembers(guildId: string): import("@discordjs/collection").Collection<string, import("discord.js").GuildMember>;
    getMember(guildId: string, memberId: string): import("discord.js").GuildMember;
    getOwner(guildId: string): string;
    getChansOf<T extends GuildBasedChannel>(type: ChannelType, guildId: string): import("@discordjs/collection").Collection<string, T>;
    getCategories(guildId: string): import("@discordjs/collection").Collection<string, CategoryChannel>;
    getChannels(guildId: string): import("@discordjs/collection").Collection<string, TextChannel>;
    getChannel(guildId: string, channelId: string): GuildBasedChannel;
    getRoles(guildId: string): import("@discordjs/collection").Collection<string, import("discord.js").Role>;
}

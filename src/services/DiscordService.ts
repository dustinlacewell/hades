import { ChannelType } from 'discord-api-types/v10';
import { CategoryChannel, GuildBasedChannel, TextChannel } from 'discord.js';
import { inject } from 'inversify';

import { singleton } from '../decorators';
import { HadesClient } from './HadesClient';


export type ChannelTypes =
    "GUILD_CATEGORY" |
    "GUILD_NEWS" |
    "GUILD_STAGE_VOICE" |
    "GUILD_STORE" |
    "GUILD_TEXT" |
    "GUILD_VOICE"

/**
 * A service for getting guild information from Discord.
 * 
 * @inject client HadesClient The client to use for communicating with Discord.
 */
@singleton(DiscordService)
export class DiscordService {
    constructor(
        @inject(HadesClient)
        private client: HadesClient,
    ) { }

    /**
     * Get all guilds the bot is in.
     */
    get guilds() {
        return this.client.guilds.cache;
    }

    /**
     * Get the name of a guild.
     * @param guildId The ID of the guild.
     * @returns string | undefined
     */
    getName(guildId: string) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.name;
        }
    }

    /**
     * Get the members of a guild.
     * @param guildId The ID of the guild.
     * @returns Collection<string, GuildMember> | undefined
     */
    getMembers(guildId: string) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.members.cache;
        }
    }

    /**
     * Get a member of a guild.
     * @param guildId The ID of the guild.
     * @param memberId The ID of the member.
     * @returns GuildMember | undefined
     */
    getMember(guildId: string, memberId: string) {
        const members = this.getMembers(guildId);
        if (members !== undefined) {
            return members.get(memberId);
        }
    }

    /**
     * Get the ID of a guild's owner.
     * @param guildId The ID of the guild.
     * @returns string | undefined
     */
    getOwner(guildId: string) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.ownerId;
        }
    }

    /**
     * Get channels of a certain type.
     * @param type The type of channel to get.
     * @param guildId The ID of the guild.
     * @returns Collection<string, GuildChannel>
     */
    getChansOf<T extends GuildBasedChannel>(type: ChannelTypes, guildId: string) {
        console.log(`Grabbing channels of type ${type} for guild ${guildId}`);
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.channels.cache
                .filter((chan, _) => chan.type === type)
                .mapValues((chan, _) => chan as T)
        }
    }

    /**
     * Get the channel categories of a guild.
     * @param guildId The ID of the guild.
     * @returns Collection<string, CategoryChannel>
     */
    getCategories(guildId: string) {
        return this.getChansOf<CategoryChannel>("GUILD_CATEGORY", guildId);
    }

    /**
     * Get the channels of a guild.
     * @param guildId The ID of the guild.
     * @returns Collection<string, TextChannel>
     */
    getChannels(guildId: string) {
        return this.getChansOf<TextChannel>("GUILD_TEXT", guildId);
    }

    /**
     * Get a channel of a guild.
     * @param guildId The ID of the guild.
     * @param channelId The ID of the channel.
     * @returns GuildChannel | undefined
     */
    getChannel(guildId: string, channelId: string) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.channels.cache.get(channelId);
        }
    }

    /**
     * Get the roles of a guild.
     * @param guildId The ID of the guild.
     * @returns Collection<string, Role>
     */
    getRoles(guildId: string) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.roles.cache;
        }
    }
}

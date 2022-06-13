import { ChannelType } from 'discord-api-types/v10';
import { CategoryChannel, GuildBasedChannel, TextChannel } from 'discord.js';
import { inject } from 'inversify';

import { singleton } from '../decorators';
import { HadesClient } from './HadesClient';

@singleton(DiscordService)
export class DiscordService {
    constructor(
        @inject(HadesClient)
        private client: HadesClient,
    ) { }

    get guilds() {
        return this.client.guilds.cache;
    }

    getName(guildId: string) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.name;
        }
    }

    getMembers(guildId: string) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.members.cache;
        }
    }

    getMember(guildId: string, memberId: string) {
        const members = this.getMembers(guildId);
        if (members !== undefined) {
            return members.get(memberId);
        }
    }

    getOwner(guildId: string) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.ownerId;
        }
    }

    getChansOf<T extends GuildBasedChannel>(type: ChannelType, guildId: string) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.channels.cache
                .filter((chan, _) => ChannelType[chan.type] === type)
                .mapValues((chan, _) => chan as T)
        }
    }

    getCategories(guildId: string) {
        return this.getChansOf<CategoryChannel>(ChannelType.GuildCategory, guildId);
    }

    getChannels(guildId: string) {
        return this.getChansOf<TextChannel>(ChannelType.GuildText, guildId);
    }

    getChannel(guildId: string, channelId: string) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.channels.cache.get(channelId);
        }
    }

    getRoles(guildId: string) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.roles.cache;
        }
    }
}

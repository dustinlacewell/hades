import { CategoryChannel, GuildChannel, TextChannel } from 'discord.js';
import { inject } from 'inversify';

import singleton from '../decorators/singleton';
import HadesClient from './HadesClient';


type Constructor<T> = { new(...args: any[]): T };
function typeGuard<T>(o: T, className: Constructor<T>): o is T {
    return o instanceof className;
}

@singleton(DiscordService)
export default class DiscordService {
    constructor(@inject(HadesClient) private client: HadesClient) { }

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
            return guild.owner;
        }
    }

    getChansOf<T extends GuildChannel>(className: Constructor<T>, guildId: string) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.channels.cache
                .filter((chan, _) => typeGuard(chan, className))
                .mapValues((chan, _) => chan as T)
        }
    }

    getCategories(guildId: string) {
        return this.getChansOf(CategoryChannel, guildId);
    }

    getChannels(guildId: string) {
        return this.getChansOf(TextChannel, guildId);
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

import { CategoryChannel, GuildChannel, TextChannel } from "discord.js";
import HadesClient from "./HadesClient";
declare type Constructor<T> = {
    new (...args: any[]): T;
};
export default class DiscordService {
    private client;
    constructor(client: HadesClient);
    get guilds(): import("discord.js").Collection<string, import("discord.js").Guild>;
    getName(guildId: string): string;
    getMembers(guildId: string): import("discord.js").Collection<string, import("discord.js").GuildMember>;
    getMember(guildId: string, memberId: string): import("discord.js").GuildMember;
    getOwner(guildId: string): import("discord.js").GuildMember;
    getChansOf<T extends GuildChannel>(className: Constructor<T>, guildId: string): import("discord.js").Collection<string, T>;
    getCategories(guildId: string): import("discord.js").Collection<string, CategoryChannel>;
    getChannels(guildId: string): import("discord.js").Collection<string, TextChannel>;
    getChannel(guildId: string, channelId: string): GuildChannel;
    getRoles(guildId: string): import("discord.js").Collection<string, import("discord.js").Role>;
}
export {};

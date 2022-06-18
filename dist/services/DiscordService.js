"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DiscordService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordService = void 0;
const v10_1 = require("discord-api-types/v10");
const inversify_1 = require("inversify");
const decorators_1 = require("../decorators");
const HadesClient_1 = require("./HadesClient");
/**
 * A service for getting guild information from Discord.
 *
 * @inject client HadesClient The client to use for communicating with Discord.
 */
let DiscordService = DiscordService_1 = class DiscordService {
    constructor(client) {
        this.client = client;
    }
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
    getName(guildId) {
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
    getMembers(guildId) {
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
    getMember(guildId, memberId) {
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
    getOwner(guildId) {
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
    getChansOf(type, guildId) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.channels.cache
                .filter((chan, _) => v10_1.ChannelType[chan.type] === type)
                .mapValues((chan, _) => chan);
        }
    }
    /**
     * Get the channel categories of a guild.
     * @param guildId The ID of the guild.
     * @returns Collection<string, CategoryChannel>
     */
    getCategories(guildId) {
        return this.getChansOf(v10_1.ChannelType.GuildCategory, guildId);
    }
    /**
     * Get the channels of a guild.
     * @param guildId The ID of the guild.
     * @returns Collection<string, TextChannel>
     */
    getChannels(guildId) {
        return this.getChansOf(v10_1.ChannelType.GuildText, guildId);
    }
    /**
     * Get a channel of a guild.
     * @param guildId The ID of the guild.
     * @param channelId The ID of the channel.
     * @returns GuildChannel | undefined
     */
    getChannel(guildId, channelId) {
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
    getRoles(guildId) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.roles.cache;
        }
    }
};
DiscordService = DiscordService_1 = __decorate([
    (0, decorators_1.singleton)(DiscordService_1),
    __param(0, (0, inversify_1.inject)(HadesClient_1.HadesClient)),
    __metadata("design:paramtypes", [HadesClient_1.HadesClient])
], DiscordService);
exports.DiscordService = DiscordService;
//# sourceMappingURL=DiscordService.js.map
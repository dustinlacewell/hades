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
let DiscordService = DiscordService_1 = class DiscordService {
    constructor(client) {
        this.client = client;
    }
    get guilds() {
        return this.client.guilds.cache;
    }
    getName(guildId) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.name;
        }
    }
    getMembers(guildId) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.members.cache;
        }
    }
    getMember(guildId, memberId) {
        const members = this.getMembers(guildId);
        if (members !== undefined) {
            return members.get(memberId);
        }
    }
    getOwner(guildId) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.ownerId;
        }
    }
    getChansOf(type, guildId) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.channels.cache
                .filter((chan, _) => v10_1.ChannelType[chan.type] === type)
                .mapValues((chan, _) => chan);
        }
    }
    getCategories(guildId) {
        return this.getChansOf(v10_1.ChannelType.GuildCategory, guildId);
    }
    getChannels(guildId) {
        return this.getChansOf(v10_1.ChannelType.GuildText, guildId);
    }
    getChannel(guildId, channelId) {
        const guild = this.guilds.get(guildId);
        if (guild !== undefined) {
            return guild.channels.cache.get(channelId);
        }
    }
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
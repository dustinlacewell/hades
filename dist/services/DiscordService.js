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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var DiscordService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const singleton_1 = __importDefault(require("../decorators/singleton"));
const HadesClient_1 = __importDefault(require("./HadesClient"));
function typeGuard(o, className) {
    return o instanceof className;
}
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
            return guild.owner;
        }
    }
    getChansOf(className, guildId) {
        const guild = this.guilds.get(guildId);
        console.log(`Found guild from id ${guildId}: ${guild}`);
        if (guild !== undefined) {
            return guild.channels.cache
                .filter((chan, _) => typeGuard(chan, className))
                .mapValues((chan, _) => chan);
        }
    }
    getCategories(guildId) {
        return this.getChansOf(discord_js_1.CategoryChannel, guildId);
    }
    getChannels(guildId) {
        console.log(`Checking guild channels for guild: ${guildId}`);
        return this.getChansOf(discord_js_1.TextChannel, guildId);
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
    singleton_1.default(DiscordService_1),
    __param(0, inversify_1.inject(HadesClient_1.default)),
    __metadata("design:paramtypes", [HadesClient_1.default])
], DiscordService);
exports.default = DiscordService;
//# sourceMappingURL=DiscordService.js.map
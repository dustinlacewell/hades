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
var EventService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const inversify_1 = require("inversify");
const decorators_1 = require("../decorators");
const HadesClient_1 = require("./HadesClient");
let EventService = EventService_1 = class EventService {
    constructor(client) {
        this.client = client;
    }
    register(bot) {
        this.client
            .on('debug', bot.onDebug.bind(bot))
            .on('error', bot.onError.bind(bot))
            .on('warn', bot.onWarn.bind(bot))
            .on('channelCreate', bot.onChannelCreate.bind(bot))
            .on('channelDelete', bot.onChannelDelete.bind(bot))
            .on('channelPinsUpdate', bot.onChannelPinsUpdate.bind(bot))
            .on('channelUpdate', bot.onChannelUpdate.bind(bot))
            .on('ready', bot.onReady.bind(bot))
            // .on('reconnecting', bot.onReconnecting.bind(bot))
            .on('disconnect', bot.onDisconnect.bind(bot))
            .on('emojiCreate', bot.onEmojiCreate.bind(bot))
            .on('emojiDelete', bot.onEmojiDelete.bind(bot))
            .on('emojiUpdate', bot.onEmojiUpdate.bind(bot))
            .on('guildBanAdd', bot.onGuildBanAdd.bind(bot))
            .on('guildBanRemove', bot.onGuildBanRemove.bind(bot))
            .on('guildCreate', bot.onGuildCreate.bind(bot))
            .on('guildDelete', bot.onGuildDelete.bind(bot))
            .on('guildUnavailable', bot.onGuildUnavailable.bind(bot))
            .on('guildMemberAdd', bot.onGuildMemberAdd.bind(bot))
            .on('guildMemberAvailable', bot.onGuildMemberAvailable.bind(bot))
            .on('guildMemberRemove', bot.onGuildMemberRemove.bind(bot))
            .on('guildMemberSpeaking', bot.onGuildMemberSpeaking.bind(bot))
            .on('guildMemberUpdate', bot.onGuildMemberUpdate.bind(bot))
            .on('guildMembersChunk', bot.onGuildMembersChunk.bind(bot))
            .on('guildUpdate', bot.onGuildUpdate.bind(bot))
            // .on('message', bot.onMessage.bind(bot))
            .on('messageCreate', (...args) => bot.onMessage(...args))
            .on('messageDelete', bot.onMessageDelete.bind(bot))
            .on('messageDeleteBulk', bot.onMessageDeleteBulk.bind(bot))
            .on('messageReactionAdd', bot.onMessageReactionAdd.bind(bot))
            .on('messageReactionRemove', bot.onMessageReactionRemove.bind(bot))
            .on('messageReactionRemoveAll', bot.onMessageReactionRemoveAll.bind(bot))
            .on('messageUpdate', bot.onMessageUpdate.bind(bot))
            .on('presenceUpdate', bot.onPresenceUpdate.bind(bot))
            .on('typingStart', bot.onTypingStart.bind(bot))
            // .on('typingStop', bot.onTypingStop.bind(bot))
            .on('roleCreate', bot.onRoleCreate.bind(bot))
            .on('roleDelete', bot.onRoleDelete.bind(bot))
            .on('roleUpdate', bot.onRoleUpdate.bind(bot))
            // .on('userNoteUpdate', bot.onUserNoteUpdate.bind(bot))
            .on('userUpdate', bot.onUserUpdate.bind(bot))
            .on('voiceStateUpdate', bot.onVoiceStateUpdate.bind(bot));
    }
};
EventService = EventService_1 = __decorate([
    (0, decorators_1.singleton)(EventService_1),
    __param(0, (0, inversify_1.inject)(HadesClient_1.HadesClient)),
    __metadata("design:paramtypes", [HadesClient_1.HadesClient])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=EventService.js.map
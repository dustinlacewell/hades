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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const CommandService_1 = __importDefault(require("./CommandService"));
const EventService_1 = __importDefault(require("./EventService"));
const HadesClient_1 = __importDefault(require("./HadesClient"));
let HadesBotService = class HadesBotService {
    constructor(client, token, commandService, eventService) {
        this.client = client;
        this.token = token;
        this.eventService = eventService;
        this.commandService = commandService;
    }
    postConstruct() {
        this.eventService.register(this);
        this.login();
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.login(this.token.toString());
        });
    }
    /* logging */
    onDebug(...args) {
        return __awaiter(this, void 0, void 0, function* () { console.debug(...args); });
    }
    onError(...args) {
        return __awaiter(this, void 0, void 0, function* () { console.error(...args); });
    }
    onWarn(...args) {
        return __awaiter(this, void 0, void 0, function* () { console.warn(...args); });
    }
    /* channels */
    onChannelCreate(channel) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onChannelDelete(channel) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onChannelPinsUpdate(channel, time) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onChannelUpdate(oldChannel, newChannel) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /* connection */
    onReady() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onReconnecting() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onDisconnect(event) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /* emoji */
    onEmojiCreate(emoji) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onEmojiDelete(emoji) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onEmojiUpdate(emoji) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /* bans */
    onGuildBanAdd(guild, user) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onGuildBanRemove(guild, user) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /* bot guilds */
    onGuildCreate(guild) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onGuildDelete(guild) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onGuildUnavailable(guild) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /* guild members */
    onGuildMemberAdd(member) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onGuildMemberAvailable(member) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onGuildMemberRemove(member) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onGuildMemberSpeaking(member, isSpeaking) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onGuildMemberUpdate(oldMember, newMember) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onGuildMembersChunk(members, guild) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onGuildUpdate(oldGuild, newGuild) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /* messages */
    onMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.commandService.dispatch(message);
        });
    }
    onMessageDelete(message) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onMessageDeleteBulk(messages) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onMessageReactionAdd(reaction, user) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onMessageReactionRemove(reaction, user) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onMessageReactionRemoveAll(message) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onMessageUpdate(oldMessage, newMessage) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /* prescence */
    onPresenceUpdate(oldMember, newMember) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onTypingStart(channel, user) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onTypingStop(channel, user) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /* roles */
    onRoleCreate(role) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onRoleDelete(role) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onRoleUpdate(oldRole, newRole) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /* users */
    onUserNoteUpdate(user, oldNote, newNote) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onUserUpdate(oldUser, newUser) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onVoiceStateUpdate(oldMember, newMember) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
};
__decorate([
    inversify_1.postConstruct(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HadesBotService.prototype, "postConstruct", null);
HadesBotService = __decorate([
    __param(0, inversify_1.inject(HadesClient_1.default)),
    __param(1, inversify_1.inject('cfg.discordToken')),
    __param(2, inversify_1.inject(CommandService_1.default)),
    __param(3, inversify_1.inject(EventService_1.default)),
    __metadata("design:paramtypes", [HadesClient_1.default,
        String,
        CommandService_1.default,
        EventService_1.default])
], HadesBotService);
exports.default = HadesBotService;
//# sourceMappingURL=HadesBotService.js.map
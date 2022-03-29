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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var DispatchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_command_parser_1 = require("discord-command-parser");
const CommandContext_1 = __importDefault(require("../commands/CommandContext"));
const singleton_1 = __importDefault(require("../decorators/singleton"));
let DispatchService = DispatchService_1 = class DispatchService {
    constructor() {
        this.consumers = [];
        this.options = {
            allowSpaceBeforeCommand: true,
            ignorePrefixCase: true
        };
    }
    register(consumer) {
        this.consumers.push(consumer);
    }
    parse(msg) {
        const botname = `<@!${msg.client.user.id}>`;
        msg.content = msg.content.replace(botname, "!");
        const parsed = discord_command_parser_1.parse(msg, "!", this.options);
        if (!parsed.success) {
            return;
        }
        ;
        return new CommandContext_1.default(msg, parsed);
    }
    dispatch(msg) {
        const ctx = this.parse(msg);
        if (ctx == null) {
            return;
        }
        for (let consumer of this.consumers) {
            consumer(ctx);
        }
    }
};
DispatchService = DispatchService_1 = __decorate([
    singleton_1.default(DispatchService_1),
    __metadata("design:paramtypes", [])
], DispatchService);
exports.default = DispatchService;
//# sourceMappingURL=DispatchService.js.map
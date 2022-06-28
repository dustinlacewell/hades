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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandBotService = void 0;
const inversify_1 = require("inversify");
const HadesBotService_1 = require("../../services/HadesBotService");
const SlashCommandService_1 = require("./SlashCommandService/SlashCommandService");
let SlashCommandBotService = class SlashCommandBotService extends HadesBotService_1.HadesBotService {
    // @inject(SlashCommandHelpService)
    // helpService: SlashCommandHelpService
    onReady() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Executing onReady...");
            yield this.commandService.registerCommands(this.client);
            //await this.client.application.commands.set(Commands);
        });
    }
    onInteractionCreate(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Executing onInteractionCreate...");
            if (!interaction.isCommand() || interaction.isContextMenu()) {
                return;
            }
            // await this.executeSlashCommand(interaction);
            this.commandService.dispatch(interaction);
        });
    }
};
__decorate([
    (0, inversify_1.inject)(SlashCommandService_1.SlashCommandService),
    __metadata("design:type", SlashCommandService_1.SlashCommandService)
], SlashCommandBotService.prototype, "commandService", void 0);
SlashCommandBotService = __decorate([
    (0, inversify_1.injectable)()
], SlashCommandBotService);
exports.SlashCommandBotService = SlashCommandBotService;
//# sourceMappingURL=SlashCommandBotService.js.map
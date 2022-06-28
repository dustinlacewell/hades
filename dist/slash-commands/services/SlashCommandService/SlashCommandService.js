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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var SlashCommandService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandService = void 0;
const inversify_1 = require("inversify");
const singleton_1 = require("../../../decorators/singleton");
const SlashArgError_1 = require("../../errors/SlashArgError");
const SlashCommandFactoryRegistry_1 = require("../SlashCommandFactory/SlashCommandFactoryRegistry");
const SlashParserService_1 = require("./SlashParserService");
const commands_1 = __importDefault(require("../../builtins/commands"));
let SlashCommandService = SlashCommandService_1 = class SlashCommandService {
    // @inject(SlashCommandHelpService)
    // help: SlashCommandHelpService
    execute(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const factory = this.factories.factoryFor(ctx.command);
            if (factory) {
                try {
                    const command = yield factory.create(ctx);
                    yield command.execute();
                }
                catch (e) {
                    if (e instanceof SlashArgError_1.SlashArgError) {
                        if (e.showHelp) {
                            ctx.interaction.reply({
                                content: e.message,
                            });
                        }
                        else {
                            ctx.interaction.reply(e.message);
                        }
                    }
                    else {
                        ctx.interaction.reply("Erm, uh well something went wrong. Dunno what though.");
                        console.error(e);
                    }
                }
            }
        });
    }
    dispatch(interaction) {
        const parsedMessage = this.parserService.parse(interaction);
        if (parsedMessage) {
            this.execute(parsedMessage);
        }
    }
    registerCommands(client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client.application.commands.set(commands_1.default);
        });
    }
};
__decorate([
    (0, inversify_1.inject)(SlashParserService_1.SlashParserService),
    __metadata("design:type", SlashParserService_1.SlashParserService)
], SlashCommandService.prototype, "parserService", void 0);
__decorate([
    (0, inversify_1.inject)(SlashCommandFactoryRegistry_1.SlashCommandFactoryRegistry),
    __metadata("design:type", SlashCommandFactoryRegistry_1.SlashCommandFactoryRegistry)
], SlashCommandService.prototype, "factories", void 0);
SlashCommandService = SlashCommandService_1 = __decorate([
    (0, singleton_1.singleton)(SlashCommandService_1)
], SlashCommandService);
exports.SlashCommandService = SlashCommandService;
//# sourceMappingURL=SlashCommandService.js.map
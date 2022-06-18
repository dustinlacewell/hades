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
var TextCommandService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextCommandService = void 0;
const inversify_1 = require("inversify");
const TextArgError_1 = require("../../errors/TextArgError");
const singleton_1 = require("../../../decorators/singleton");
const TextParserService_1 = require("./TextParserService");
const TextCommandFactoryRegistry_1 = require("../TextCommandFactory/TextCommandFactoryRegistry");
const TextCommandHelpService_1 = require("../TextCommandHelpService/TextCommandHelpService");
/**
 * Orchestrates parsing and executing commands.
 *
 * TODO: Actually implement sensible command prefix support.
 *
 */
let TextCommandService = TextCommandService_1 = class TextCommandService {
    execute(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const factory = this.factories.factoryFor(ctx.command);
            if (factory) {
                try {
                    const command = yield factory.create(ctx);
                    yield command.execute();
                }
                catch (e) {
                    if (e instanceof TextArgError_1.TextArgError) {
                        if (e.showHelp) {
                            ctx.msg.reply({
                                content: e.message,
                                embeds: [this.help.getHelpEmbed(ctx.command)]
                            });
                        }
                        else {
                            ctx.msg.reply(e.message);
                        }
                    }
                    else {
                        ctx.msg.reply("Erm, uh well something went wrong. Dunno what though.");
                        console.error(e);
                    }
                }
            }
        });
    }
    dispatch(msg) {
        const parsedMessage = this.parserService.parse(msg);
        if (parsedMessage) {
            this.execute(parsedMessage);
        }
    }
};
__decorate([
    (0, inversify_1.inject)(TextParserService_1.TextParserService),
    __metadata("design:type", TextParserService_1.TextParserService
    /** factories for creating command instances */
    )
], TextCommandService.prototype, "parserService", void 0);
__decorate([
    (0, inversify_1.inject)(TextCommandFactoryRegistry_1.TextCommandFactoryRegistry),
    __metadata("design:type", TextCommandFactoryRegistry_1.TextCommandFactoryRegistry)
], TextCommandService.prototype, "factories", void 0);
__decorate([
    (0, inversify_1.inject)(TextCommandHelpService_1.TextCommandHelpService),
    __metadata("design:type", TextCommandHelpService_1.TextCommandHelpService)
], TextCommandService.prototype, "help", void 0);
TextCommandService = TextCommandService_1 = __decorate([
    (0, singleton_1.singleton)(TextCommandService_1)
], TextCommandService);
exports.TextCommandService = TextCommandService;
//# sourceMappingURL=TextCommandService.js.map
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
var SlashParserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashParserService = exports.defaults = void 0;
const inversify_1 = require("inversify");
const decorators_1 = require("../../../decorators");
const models_1 = require("../../models");
exports.defaults = {
    prefix: "!",
};
let SlashParserService = SlashParserService_1 = class SlashParserService {
    constructor(options) {
        this.options = Object.assign(Object.assign({}, exports.defaults), options);
    }
    /**
     * Parse a Discord.js interaction into a SlashCommandContext
     * @param msg The underlying Discord.js Slash Command Interaction
     * @returns A new SlashCommandContext or null
     */
    parse(interaction) {
        const parsed = "";
        // if (!parsed.success) {
        //     return null;
        // };
        return new models_1.SlashCommandContext(interaction, parsed);
    }
};
SlashParserService = SlashParserService_1 = __decorate([
    (0, decorators_1.singleton)(SlashParserService_1),
    __param(0, (0, inversify_1.optional)()),
    __param(0, (0, inversify_1.inject)("PARSER_OPTIONS")),
    __metadata("design:paramtypes", [Object])
], SlashParserService);
exports.SlashParserService = SlashParserService;
//# sourceMappingURL=SlashParserService.js.map
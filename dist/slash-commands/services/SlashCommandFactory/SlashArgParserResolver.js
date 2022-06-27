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
var SlashArgParserResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashArgParserResolver = void 0;
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const singleton_1 = require("../../../decorators/singleton");
const parsers_1 = require("../../parsers");
/**
 * Decides which parser to use for a given argument type.
 */
let SlashArgParserResolver = SlashArgParserResolver_1 = class SlashArgParserResolver {
    constructor() {
        this.map = new discord_js_1.Collection();
    }
    init() {
        this.types.forEach(([from, to]) => this.map.set(from, to));
    }
    /**
     * Get a parser type for a given argument type.
     * @param fromType The argument type to look up.
     * @returns
     */
    infer(fromType) {
        if (!fromType) {
            return parsers_1.StringParser;
        }
        for (let [ctor, type] of this.map) {
            if (ctor.name === fromType.toString()) {
                return type;
            }
        }
    }
};
__decorate([
    (0, inversify_1.multiInject)('MappedTypes'),
    __metadata("design:type", Array)
], SlashArgParserResolver.prototype, "types", void 0);
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SlashArgParserResolver.prototype, "init", null);
SlashArgParserResolver = SlashArgParserResolver_1 = __decorate([
    (0, singleton_1.singleton)(SlashArgParserResolver_1)
], SlashArgParserResolver);
exports.SlashArgParserResolver = SlashArgParserResolver;
//# sourceMappingURL=SlashArgParserResolver.js.map
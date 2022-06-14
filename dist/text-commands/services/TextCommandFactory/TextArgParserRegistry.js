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
var TextArgParserRegistry_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextArgParserRegistry = void 0;
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const singleton_1 = require("../../../decorators/singleton");
const TextArgParser_1 = require("../../parsers/TextArgParser");
/**
 * A registry of decorated Parsers.
 */
let TextArgParserRegistry = TextArgParserRegistry_1 = class TextArgParserRegistry {
    constructor(parsers) {
        this.parsers = new discord_js_1.Collection();
        for (let parser of parsers) {
            this.parsers.set(parser.constructor, parser);
        }
    }
    parserFor(parserType) {
        return this.parsers.get(parserType);
    }
};
TextArgParserRegistry = TextArgParserRegistry_1 = __decorate([
    (0, singleton_1.singleton)(TextArgParserRegistry_1),
    __param(0, (0, inversify_1.multiInject)(TextArgParser_1.TextArgParser)),
    __metadata("design:paramtypes", [Array])
], TextArgParserRegistry);
exports.TextArgParserRegistry = TextArgParserRegistry;
//# sourceMappingURL=TextArgParserRegistry.js.map
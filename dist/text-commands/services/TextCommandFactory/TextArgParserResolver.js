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
var TextArgParserResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextArgParserResolver = void 0;
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const singleton_1 = require("../../../decorators/singleton");
const parsers_1 = require("../../parsers");
let TextArgParserResolver = TextArgParserResolver_1 = class TextArgParserResolver {
    constructor(types) {
        this.types = new discord_js_1.Collection();
        for (let [from, to] of types) {
            this.types.set(from, to);
        }
    }
    infer(fromType) {
        if (!fromType) {
            return parsers_1.StringParser;
        }
        for (let [ctor, type] of this.types) {
            if (ctor.name === fromType.toString()) {
                return type;
            }
        }
    }
};
TextArgParserResolver = TextArgParserResolver_1 = __decorate([
    (0, singleton_1.singleton)(TextArgParserResolver_1),
    __param(0, (0, inversify_1.multiInject)('MappedTypes')),
    __metadata("design:paramtypes", [Array])
], TextArgParserResolver);
exports.TextArgParserResolver = TextArgParserResolver;
//# sourceMappingURL=TextArgParserResolver.js.map
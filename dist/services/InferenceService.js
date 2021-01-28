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
var InferenceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const decorators_1 = require("../decorators");
let InferenceService = InferenceService_1 = class InferenceService {
    constructor(types) {
        this.types = new discord_js_1.Collection();
        for (let [from, to] of types) {
            console.log(`Mapping inferred type ${from.name} to ${to.name}.`);
            this.types.set(from, to);
        }
    }
    infer(fromType) {
        for (let [ctor, type] of this.types) {
            if (ctor.toString() === fromType.toString()) {
                return type;
            }
        }
    }
};
InferenceService = InferenceService_1 = __decorate([
    decorators_1.singleton(InferenceService_1),
    __param(0, inversify_1.multiInject('MappedTypes')),
    __metadata("design:paramtypes", [Array])
], InferenceService);
exports.default = InferenceService;
//# sourceMappingURL=InferenceService.js.map
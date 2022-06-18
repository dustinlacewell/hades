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
var TextCommandFactoryRegistry_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextCommandFactoryRegistry = void 0;
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const singleton_1 = require("../../../decorators/singleton");
const TextCommandFactory_1 = require("./TextCommandFactory");
/**
 * A registry of available command factories.
 */
let TextCommandFactoryRegistry = TextCommandFactoryRegistry_1 = class TextCommandFactoryRegistry {
    constructor() {
        this.map = new discord_js_1.Collection();
    }
    init() {
        for (const factory of this.factories) {
            this.map.set(factory.meta.name, factory);
        }
    }
    factoryFor(name) {
        return this.map.get(name);
    }
    find(predicate) {
        return this.factories.find(predicate);
    }
    all() {
        return this.factories;
    }
};
__decorate([
    (0, inversify_1.multiInject)(TextCommandFactory_1.TextCommandFactory),
    __metadata("design:type", Array)
], TextCommandFactoryRegistry.prototype, "factories", void 0);
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TextCommandFactoryRegistry.prototype, "init", null);
TextCommandFactoryRegistry = TextCommandFactoryRegistry_1 = __decorate([
    (0, singleton_1.singleton)(TextCommandFactoryRegistry_1)
], TextCommandFactoryRegistry);
exports.TextCommandFactoryRegistry = TextCommandFactoryRegistry;
//# sourceMappingURL=TextCommandFactoryRegistry.js.map
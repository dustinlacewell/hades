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
var TextCommandHelpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextCommandHelpService = void 0;
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const decorators_1 = require("../../../decorators");
const TextCommandHelperRegistry_1 = require("./TextCommandHelperRegistry");
let TextCommandHelpService = TextCommandHelpService_1 = class TextCommandHelpService {
    getHelpEmbed(command) {
        const helper = this.helpers.helperFor(command);
        if (helper) {
            return helper.getHelpEmbed();
        }
    }
    getCommandsEmbed() {
        let embed = new discord_js_1.MessageEmbed();
        const undocumented = [];
        for (const helper of this.helpers.helpers) {
            if (helper.args.size > 0 || helper.description) {
                embed = embed.addField(helper.getUsage(), helper.description);
            }
            else {
                undocumented.push(helper);
            }
        }
        embed = embed.addField("Other commands:", undocumented.map(helper => helper.name).join(", "));
        return embed;
    }
};
__decorate([
    (0, inversify_1.multiInject)(TextCommandHelperRegistry_1.TextCommandHelperRegistry),
    __metadata("design:type", TextCommandHelperRegistry_1.TextCommandHelperRegistry)
], TextCommandHelpService.prototype, "helpers", void 0);
TextCommandHelpService = TextCommandHelpService_1 = __decorate([
    (0, decorators_1.singleton)(TextCommandHelpService_1)
], TextCommandHelpService);
exports.TextCommandHelpService = TextCommandHelpService;
//# sourceMappingURL=TextCommandHelpService.js.map
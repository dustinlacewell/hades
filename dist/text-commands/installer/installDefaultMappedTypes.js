"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDefaultMappedTypes = void 0;
const discord_js_1 = require("discord.js");
const parsers_1 = require("../parsers");
const installDefaultMappedTypes = (container) => {
    [
        [String, parsers_1.StringParser],
        [Number, parsers_1.IntegerParser],
        [discord_js_1.Channel, parsers_1.ChannelParser],
        [discord_js_1.User, parsers_1.UserParser],
        [discord_js_1.Role, parsers_1.RoleParser],
        [discord_js_1.GuildChannel, parsers_1.GuildChannelParser],
        [discord_js_1.GuildMember, parsers_1.MemberParser],
    ].forEach(pair => container.bind('MappedTypes').toConstantValue(pair));
};
exports.installDefaultMappedTypes = installDefaultMappedTypes;
//# sourceMappingURL=installDefaultMappedTypes.js.map
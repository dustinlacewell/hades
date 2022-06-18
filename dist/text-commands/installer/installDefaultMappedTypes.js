"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDefaultMappedTypes = exports.defaultMappedTypes = void 0;
const discord_js_1 = require("discord.js");
const parsers_1 = require("../parsers");
exports.defaultMappedTypes = [
    [String, parsers_1.StringParser],
    [Number, parsers_1.IntegerParser],
    [discord_js_1.Channel, parsers_1.ChannelParser],
    [discord_js_1.User, parsers_1.UserParser],
    [discord_js_1.Role, parsers_1.RoleParser],
    [discord_js_1.GuildChannel, parsers_1.GuildChannelParser],
    [discord_js_1.GuildMember, parsers_1.MemberParser],
];
/**
 * Binds which Parsers to use for what argument types, by default.
 * @param container HadesContainer to use.
 * @param mappedTypes Type mappings.
 */
const installDefaultMappedTypes = (container, mappedTypes) => {
    mappedTypes.forEach(pair => {
        container.bind('MappedTypes').toConstantValue(pair);
    });
};
exports.installDefaultMappedTypes = installDefaultMappedTypes;
//# sourceMappingURL=installDefaultMappedTypes.js.map
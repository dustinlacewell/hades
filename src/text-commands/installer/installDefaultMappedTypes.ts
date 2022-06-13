import { Channel, User, Role, GuildChannel, GuildMember } from "discord.js";
import { Container } from "inversify";
import { StringParser, IntegerParser, ChannelParser, UserParser, RoleParser, GuildChannelParser, MemberParser } from "../parsers";


export const installDefaultMappedTypes = (container: Container) => {
    [
        [String, StringParser],
        [Number, IntegerParser],
        [Channel, ChannelParser],
        [User, UserParser],
        [Role, RoleParser],
        [GuildChannel, GuildChannelParser],
        [GuildMember, MemberParser],
    ].forEach(
        pair => container.bind('MappedTypes').toConstantValue(pair)
    );
}
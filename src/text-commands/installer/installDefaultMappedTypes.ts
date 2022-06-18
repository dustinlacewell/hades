import { Channel, User, Role, GuildChannel, GuildMember } from "discord.js";
import { Container } from "inversify";
import { Constructable, Newable } from "../../utils";
import { StringParser, IntegerParser, ChannelParser, UserParser, RoleParser, GuildChannelParser, MemberParser, TextArgParser } from "../parsers";

export type TypePair = readonly [Constructable, Newable<TextArgParser>];

export const defaultMappedTypes: TypePair[] = [
    [String, StringParser],
    [Number, IntegerParser],
    [Channel, ChannelParser],
    [User, UserParser],
    [Role, RoleParser],
    [GuildChannel, GuildChannelParser],
    [GuildMember, MemberParser],
]

/**
 * Binds which Parsers to use for what argument types, by default.
 * @param container HadesContainer to use.
 * @param mappedTypes Type mappings.
 */
export const installDefaultMappedTypes = (container: Container, mappedTypes: TypePair[]) => {
    mappedTypes.forEach(
        pair => {
            container.bind('MappedTypes').toConstantValue(pair)
        }
    );
}
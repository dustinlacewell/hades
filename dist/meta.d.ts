import { Collection } from "discord.js";
import Parser from "./parsers/Parser";
import { Constructor, Installer, Newable } from "./utils";
export declare enum ArgType {
    UNKNOWN = "???",
    STRING = "string",
    INTEGER = "integer",
    FLOAT = "float",
    CHANNELID = "channel-id",
    USERID = "user-id",
    ROLEID = "role-id",
    CHANNEL = "channel",
    GUILDCHANNEL = "guild-channel",
    USER = "user",
    MEMBER = "member",
    ROLE = "role"
}
export declare class ArgMeta {
    name?: string;
    type?: Constructor;
    property?: string;
    description?: string;
    parserType?: Newable<Parser>;
    validatorMethods: Set<string>;
    validatorInstallers: Installer[];
}
export declare class ParserMeta {
    type: Newable<Parser>;
    description?: string;
}
export declare class CommandMeta {
    name: string;
    target: Constructor;
    args: Collection<string, ArgMeta>;
    description?: string;
    getArgMeta(name: string): ArgMeta;
    addValidatorMethod(argName: string, methodName: string): Set<string>;
}
export declare function getParserMetas(): Set<ParserMeta>;
export declare function setParserMetas(metas: Collection<string, ParserMeta>): void;
export declare function registerParser(target: Newable<Parser>): void;
export declare function getCommandMetas(): Collection<Constructor, CommandMeta>;
export declare function setCommandMetas(metas: Collection<Constructor, CommandMeta>): void;
export declare function getCommandMeta(target: Constructor): CommandMeta;
export declare function getArgMeta(target: Constructor, argName: string): ArgMeta;
export declare function addValidatorMethod(target: Constructor, argName: string, methodName: string): Set<string>;
export declare function addArgValidator(target: Constructor, argName: string, installer: Installer): void;

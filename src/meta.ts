import { Collection } from "discord.js";

import Parser from "./parsers/Parser";
import { Constructor, Installer, Newable } from "./utils";


const PARSER_METADATA = Symbol("Hades:ParserMetadata");
const COMMAND_METADATA = Symbol("Hades:CommandMetadata");

export class CommandMeta {
    name: string;
    target: Constructor;
    args = new Collection<string, ArgMeta>();
    description?: string;

    getArgMeta(name: string) {
        let meta = this.args.get(name)
        if (meta === undefined) {
            meta = new ArgMeta();
            this.args.set(name, meta);
        }
        return meta;
    }

    addValidatorMethod(argName: string, methodName: string) {
        const arg = this.getArgMeta(argName);
        return arg.validatorMethods.add(methodName);
    }
}

export class ArgMeta {
    name?: string;
    type?: Constructor;
    property?: string;
    description?: string;

    parserType?: Newable<Parser>;
    validatorMethods = new Set<string>();
    validatorInstallers: Installer[] = [];
}

export class ParserMeta {
    type: Newable<Parser>;
    description?: string;
}

export function getCommandMetas(): Collection<Constructor, CommandMeta> {
    let metas = Reflect.getMetadata(COMMAND_METADATA, CommandMeta);
    if (metas === undefined) {
        metas = new Collection<Constructor, CommandMeta>();
        setCommandMetas(metas);
    }
    return metas;
}

export function setCommandMetas(metas: Collection<Constructor, CommandMeta>) {
    return Reflect.defineMetadata(COMMAND_METADATA, metas, CommandMeta);
}

export function getCommandMeta(target: Constructor) {
    const metas = getCommandMetas();
    let meta = metas.get(target);
    if (meta === undefined) {
        meta = new CommandMeta();
        meta.target = target;
        metas.set(target, meta);
    }
    return meta;
}

export function getArgMeta(target: Constructor, argName: string) {
    const meta = getCommandMeta(target);
    return meta.getArgMeta(argName);
}

export function addValidatorMethod(target: Constructor, argName: string, methodName: string) {
    const meta = getArgMeta(target, argName);
    return meta.validatorMethods.add(methodName);
}

export function addArgValidator(target: Constructor, argName: string, installer: Installer) {
    const meta = getArgMeta(target, argName);
    meta.validatorInstallers.push(installer);
}

export function getParserMetas(): Set<ParserMeta> {
    let metas = Reflect.getMetadata(PARSER_METADATA, ParserMeta);
    if (metas === undefined) {
        metas = new Set<ParserMeta>();
        setParserMetas(metas);
    }
    return metas;
}

export function setParserMetas(metas: Collection<string, ParserMeta>) {
    return Reflect.defineMetadata(PARSER_METADATA, metas, ParserMeta);
}

export function registerParser(target: Newable<Parser>) {
    const metas = getParserMetas();
    const meta = new ParserMeta();
    meta.type = target;
    metas.add(meta);
}

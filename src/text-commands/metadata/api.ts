import { Collection } from "discord.js";
import { Parser } from "../parsers";
import { Constructor, Installer, Newable } from "../../utils";
import { ParserMeta } from "./ParserMeta";
import { TextCommandMeta } from "./TextCommandMeta";


const PARSER_METADATA = Symbol("Hades:ParserMetadata");
const COMMAND_METADATA = Symbol("Hades:CommandMetadata");


export function getCommandMetas(): Collection<Constructor, TextCommandMeta> {
    let metas = Reflect.getMetadata(COMMAND_METADATA, TextCommandMeta);
    if (metas === undefined) {
        metas = new Collection<Constructor, TextCommandMeta>();
        setCommandMetas(metas);
    }
    return metas;
}

export function setCommandMetas(metas: Collection<Constructor, TextCommandMeta>) {
    return Reflect.defineMetadata(COMMAND_METADATA, metas, TextCommandMeta);
}

export function getCommandMeta(target: Constructor) {
    const metas = getCommandMetas();
    let meta = metas.get(target);
    if (meta === undefined) {
        meta = new TextCommandMeta();
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

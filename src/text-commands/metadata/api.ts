import { Collection } from "discord.js";
import { TextArgParser } from "../parsers";
import { Constructor, InstallerFunc, Newable } from "../../utils";
import { TextArgParserMeta } from "./TextArgParserMeta";
import { TextCommandMeta } from "./TextCommandMeta";


const PARSER_METADATA = Symbol("Hades:ParserMetadata");
const COMMAND_METADATA = Symbol("Hades:CommandMetadata");


export function getTextCommandMetas(): Collection<Constructor, TextCommandMeta> {
    let metas = Reflect.getMetadata(COMMAND_METADATA, TextCommandMeta);
    if (metas === undefined) {
        metas = new Collection<Constructor, TextCommandMeta>();
        setTextCommandMetas(metas);
    }
    return metas;
}

export function setTextCommandMetas(metas: Collection<Constructor, TextCommandMeta>) {
    return Reflect.defineMetadata(COMMAND_METADATA, metas, TextCommandMeta);
}

export function getTextCommandMeta(target: Constructor) {
    const metas = getTextCommandMetas();
    let meta = metas.get(target);
    if (meta === undefined) {
        meta = new TextCommandMeta();
        meta.target = target;
        metas.set(target, meta);
    }
    return meta;
}

export function getTextArgMeta(target: Constructor, argName: string) {
    const meta = getTextCommandMeta(target);
    return meta.getArgMeta(argName);
}

export function addTextValidatorMethod(target: Constructor, argName: string, methodName: string) {
    const meta = getTextArgMeta(target, argName);
    return meta.validatorMethods.add(methodName);
}

export function addTextArgValidator(target: Constructor, argName: string, installer: InstallerFunc) {
    const meta = getTextArgMeta(target, argName);
    meta.validatorInstallers.push(installer);
}

export function getTextParserMetas(): Set<TextArgParserMeta> {
    let metas = Reflect.getMetadata(PARSER_METADATA, TextArgParserMeta);
    if (metas === undefined) {
        metas = new Set<TextArgParserMeta>();
        setTextParserMetas(metas);
    }
    return metas;
}

export function setTextParserMetas(metas: Collection<string, TextArgParserMeta>) {
    return Reflect.defineMetadata(PARSER_METADATA, metas, TextArgParserMeta);
}

export function registerTextParser(target: Newable<TextArgParser>) {
    const metas = getTextParserMetas();
    const meta = new TextArgParserMeta();
    meta.type = target;
    metas.add(meta);
}

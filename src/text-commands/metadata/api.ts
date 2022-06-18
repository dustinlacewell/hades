import { Collection } from "discord.js";
import { TextArgParser } from "../parsers";
import { Constructor, InstallerFunc, Newable } from "../../utils";
import { TextArgParserMeta } from "./TextArgParserMeta";
import { TextCommandMeta } from "./TextCommandMeta";

// key where @parser metadata is stored
const PARSER_METADATA = Symbol("Hades:ParserMetadata");
// key where @command metadata is stored
const COMMAND_METADATA = Symbol("Hades:CommandMetadata");


/**
 * Get all metas defined with @command
 * @returns A collection of TextCommandMetas
 */
export function getTextCommandMetas(): Collection<Constructor, TextCommandMeta> {
    let metas = Reflect.getMetadata(COMMAND_METADATA, TextCommandMeta);
    if (metas === undefined) {
        metas = new Collection<Constructor, TextCommandMeta>();
        setTextCommandMetas(metas);
    }
    return metas;
}

/**
 * Updates the set of @command metas.
 * @param metas All TextCommandMeta objects.
 * @returns 
 */
export function setTextCommandMetas(metas: Collection<Constructor, TextCommandMeta>) {
    return Reflect.defineMetadata(COMMAND_METADATA, metas, TextCommandMeta);
}

/**
 * Get the command metdata for a particular class.
 * @param target Target class object.
 * @returns 
 */
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

/**
 * Get the metadata for a particular argument.
 * @param target Target class object.
 * @param argName Target argument field name.
 * @returns 
 */
export function getTextArgMeta(target: Constructor, argName: string) {
    const meta = getTextCommandMeta(target);
    return meta.getArgMeta(argName);
}

/**
 * Add a method as a validator for an argument.
 * @param target Target class object.
 * @param argName Target argument field name.
 * @param methodName Validator method name.
 * @returns 
 */
export function addTextValidatorMethod(target: Constructor, argName: string, methodName: string) {
    const meta = getTextArgMeta(target, argName);
    return meta.validatorMethods.add(methodName);
}

/**
 * Add an installer for a Validator for the given argument.
 * @param target Target class object.
 * @param argName Target argument field name.
 * @param installer Validator installer.
 */
export function addTextArgValidator(target: Constructor, argName: string, installer: InstallerFunc) {
    const meta = getTextArgMeta(target, argName);
    meta.validatorInstallers.push(installer);
}


/**
 * Get all @parser metas.
 * @returns A Collection of all Parser metas.
 */
export function getTextParserMetas(): Set<TextArgParserMeta> {
    let metas = Reflect.getMetadata(PARSER_METADATA, TextArgParserMeta);
    if (metas === undefined) {
        metas = new Set<TextArgParserMeta>();
        setTextParserMetas(metas);
    }
    return metas;
}

/**
 * Update the set of @parser metas.
 * @param metas Collection of @parser metas.
 * @returns 
 */
export function setTextParserMetas(metas: Collection<string, TextArgParserMeta>) {
    return Reflect.defineMetadata(PARSER_METADATA, metas, TextArgParserMeta);
}

/**
 * Register a class as a parser.
 * @param target Target parser class.
 */
export function registerTextParser(target: Newable<TextArgParser>) {
    const metas = getTextParserMetas();
    const meta = new TextArgParserMeta();
    meta.type = target;
    metas.add(meta);
}

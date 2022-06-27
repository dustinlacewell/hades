import { Collection } from "discord.js";
import { Constructor, Newable } from "../../utils";
import { SlashArgParser } from "../parsers/SlashArgParser";
import { SlashArgParserMeta } from "./SlashArgParserMeta";
import { SlashCommandMeta } from "./slashCommandMeta";

// key where @parser metadata is stored
const PARSER_METADATA = Symbol("Hades:ParserMetadata");
// key where @command metadata is stored
const COMMAND_METADATA = Symbol("Hades:CommandMetadata");

/**
 * Get all metas defined with @command
 * @returns A collection of SlashCommandMetas
 */
export function getSlashCommandMetas(): Collection<Constructor, SlashCommandMeta> {
    let metas = Reflect.getMetadata(COMMAND_METADATA, SlashCommandMeta);
    if (metas === undefined) {
        metas = new Collection<Constructor, SlashCommandMeta>();
        setSlashCommandMetas(metas);
    }
    return metas;
}

/**
 * Updates the set of @command metas.
 * @param metas All SlashCommandMeta objects.
 * @returns 
 */
export function setSlashCommandMetas(metas: Collection<Constructor, SlashCommandMeta>) {
    return Reflect.defineMetadata(COMMAND_METADATA, metas, SlashCommandMeta);
}

/**
 * Get the command metdata for a particular class.
 * @param target Target class object.
 * @returns 
 */
export function getSlashCommandMeta(target: Constructor) {
    const metas = getSlashCommandMetas();
    let meta = metas.get(target);
    if (meta === undefined) {
        meta = new SlashCommandMeta();
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
 export function getSlashArgMeta(target: Constructor, argName: string) {
  const meta = getSlashCommandMeta(target);
  return meta.getArgMeta(argName);
}

/**
 * Get all @parser metas.
 * @returns A Collection of all Parser metas.
 */
 export function getSlashParserMetas(): Set<SlashArgParserMeta> {
  let metas = Reflect.getMetadata(PARSER_METADATA, SlashArgParserMeta);
  if (metas === undefined) {
      metas = new Set<SlashArgParserMeta>();
      setSlashParserMetas(metas);
  }
  return metas;
}

/**
* Update the set of @parser metas.
* @param metas Collection of @parser metas.
* @returns 
*/
export function setSlashParserMetas(metas: Collection<string, SlashArgParserMeta>) {
  return Reflect.defineMetadata(PARSER_METADATA, metas, SlashArgParserMeta);
}

/**
 * Register a class as a parser.
 * @param target Target parser class.
 */
 export function registerSlashParser(target: Newable<SlashArgParser>) {
  const metas = getSlashParserMetas();
  const meta = new SlashArgParserMeta();
  meta.type = target;
  metas.add(meta);
}

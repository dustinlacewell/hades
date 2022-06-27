import { Collection } from "discord.js";
import { Constructor, Newable } from "../../utils";
import { SlashArgParser } from "../parsers/SlashArgParser";
import { SlashArgParserMeta } from "./SlashArgParserMeta";
import { SlashCommandMeta } from "./slashCommandMeta";
/**
 * Get all metas defined with @command
 * @returns A collection of SlashCommandMetas
 */
export declare function getSlashCommandMetas(): Collection<Constructor, SlashCommandMeta>;
/**
 * Updates the set of @command metas.
 * @param metas All SlashCommandMeta objects.
 * @returns
 */
export declare function setSlashCommandMetas(metas: Collection<Constructor, SlashCommandMeta>): void;
/**
 * Get the command metdata for a particular class.
 * @param target Target class object.
 * @returns
 */
export declare function getSlashCommandMeta(target: Constructor): SlashCommandMeta;
/**
 * Get the metadata for a particular argument.
 * @param target Target class object.
 * @param argName Target argument field name.
 * @returns
 */
export declare function getSlashArgMeta(target: Constructor, argName: string): import("./SlashArgMeta").SlashArgMeta;
/**
 * Get all @parser metas.
 * @returns A Collection of all Parser metas.
 */
export declare function getSlashParserMetas(): Set<SlashArgParserMeta>;
/**
* Update the set of @parser metas.
* @param metas Collection of @parser metas.
* @returns
*/
export declare function setSlashParserMetas(metas: Collection<string, SlashArgParserMeta>): void;
/**
 * Register a class as a parser.
 * @param target Target parser class.
 */
export declare function registerSlashParser(target: Newable<SlashArgParser>): void;

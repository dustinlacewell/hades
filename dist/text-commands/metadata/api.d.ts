import { Collection } from "discord.js";
import { TextArgParser } from "../parsers";
import { Constructor, InstallerFunc, Newable } from "../../utils";
import { TextArgParserMeta } from "./TextArgParserMeta";
import { TextCommandMeta } from "./TextCommandMeta";
/**
 * Get all metas defined with @command
 * @returns A collection of TextCommandMetas
 */
export declare function getTextCommandMetas(): Collection<Constructor, TextCommandMeta>;
/**
 * Updates the set of @command metas.
 * @param metas All TextCommandMeta objects.
 * @returns
 */
export declare function setTextCommandMetas(metas: Collection<Constructor, TextCommandMeta>): void;
/**
 * Get the command metdata for a particular class.
 * @param target Target class object.
 * @returns
 */
export declare function getTextCommandMeta(target: Constructor): TextCommandMeta;
/**
 * Get the metadata for a particular argument.
 * @param target Target class object.
 * @param argName Target argument field name.
 * @returns
 */
export declare function getTextArgMeta(target: Constructor, argName: string): import("./TextArgMeta").TextArgMeta;
/**
 * Add a method as a validator for an argument.
 * @param target Target class object.
 * @param argName Target argument field name.
 * @param methodName Validator method name.
 * @returns
 */
export declare function addTextValidatorMethod(target: Constructor, argName: string, methodName: string): Set<string>;
/**
 * Add an installer for a Validator for the given argument.
 * @param target Target class object.
 * @param argName Target argument field name.
 * @param installer Validator installer.
 */
export declare function addTextArgValidator(target: Constructor, argName: string, installer: InstallerFunc): void;
/**
 * Get all @parser metas.
 * @returns A Collection of all Parser metas.
 */
export declare function getTextParserMetas(): Set<TextArgParserMeta>;
/**
 * Update the set of @parser metas.
 * @param metas Collection of @parser metas.
 * @returns
 */
export declare function setTextParserMetas(metas: Collection<string, TextArgParserMeta>): void;
/**
 * Register a class as a parser.
 * @param target Target parser class.
 */
export declare function registerTextParser(target: Newable<TextArgParser>): void;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSlashParser = exports.setSlashParserMetas = exports.getSlashParserMetas = exports.getSlashArgMeta = exports.getSlashCommandMeta = exports.setSlashCommandMetas = exports.getSlashCommandMetas = void 0;
const discord_js_1 = require("discord.js");
const SlashArgParserMeta_1 = require("./SlashArgParserMeta");
const slashCommandMeta_1 = require("./slashCommandMeta");
// key where @parser metadata is stored
const PARSER_METADATA = Symbol("Hades:ParserMetadata");
// key where @command metadata is stored
const COMMAND_METADATA = Symbol("Hades:CommandMetadata");
/**
 * Get all metas defined with @command
 * @returns A collection of SlashCommandMetas
 */
function getSlashCommandMetas() {
    let metas = Reflect.getMetadata(COMMAND_METADATA, slashCommandMeta_1.SlashCommandMeta);
    if (metas === undefined) {
        metas = new discord_js_1.Collection();
        setSlashCommandMetas(metas);
    }
    return metas;
}
exports.getSlashCommandMetas = getSlashCommandMetas;
/**
 * Updates the set of @command metas.
 * @param metas All SlashCommandMeta objects.
 * @returns
 */
function setSlashCommandMetas(metas) {
    return Reflect.defineMetadata(COMMAND_METADATA, metas, slashCommandMeta_1.SlashCommandMeta);
}
exports.setSlashCommandMetas = setSlashCommandMetas;
/**
 * Get the command metdata for a particular class.
 * @param target Target class object.
 * @returns
 */
function getSlashCommandMeta(target) {
    const metas = getSlashCommandMetas();
    let meta = metas.get(target);
    if (meta === undefined) {
        meta = new slashCommandMeta_1.SlashCommandMeta();
        meta.target = target;
        metas.set(target, meta);
    }
    return meta;
}
exports.getSlashCommandMeta = getSlashCommandMeta;
/**
 * Get the metadata for a particular argument.
 * @param target Target class object.
 * @param argName Target argument field name.
 * @returns
 */
function getSlashArgMeta(target, argName) {
    const meta = getSlashCommandMeta(target);
    return meta.getArgMeta(argName);
}
exports.getSlashArgMeta = getSlashArgMeta;
/**
 * Get all @parser metas.
 * @returns A Collection of all Parser metas.
 */
function getSlashParserMetas() {
    let metas = Reflect.getMetadata(PARSER_METADATA, SlashArgParserMeta_1.SlashArgParserMeta);
    if (metas === undefined) {
        metas = new Set();
        setSlashParserMetas(metas);
    }
    return metas;
}
exports.getSlashParserMetas = getSlashParserMetas;
/**
* Update the set of @parser metas.
* @param metas Collection of @parser metas.
* @returns
*/
function setSlashParserMetas(metas) {
    return Reflect.defineMetadata(PARSER_METADATA, metas, SlashArgParserMeta_1.SlashArgParserMeta);
}
exports.setSlashParserMetas = setSlashParserMetas;
/**
 * Register a class as a parser.
 * @param target Target parser class.
 */
function registerSlashParser(target) {
    const metas = getSlashParserMetas();
    const meta = new SlashArgParserMeta_1.SlashArgParserMeta();
    meta.type = target;
    metas.add(meta);
}
exports.registerSlashParser = registerSlashParser;
//# sourceMappingURL=api.js.map
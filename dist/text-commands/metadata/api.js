"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTextParser = exports.setTextParserMetas = exports.getTextParserMetas = exports.addTextArgValidator = exports.addTextValidatorMethod = exports.getTextArgMeta = exports.getTextCommandMeta = exports.setTextCommandMetas = exports.getTextCommandMetas = void 0;
const discord_js_1 = require("discord.js");
const TextArgParserMeta_1 = require("./TextArgParserMeta");
const TextCommandMeta_1 = require("./TextCommandMeta");
// key where @parser metadata is stored
const PARSER_METADATA = Symbol("Hades:ParserMetadata");
// key where @command metadata is stored
const COMMAND_METADATA = Symbol("Hades:CommandMetadata");
/**
 * Get all metas defined with @command
 * @returns A collection of TextCommandMetas
 */
function getTextCommandMetas() {
    let metas = Reflect.getMetadata(COMMAND_METADATA, TextCommandMeta_1.TextCommandMeta);
    if (metas === undefined) {
        metas = new discord_js_1.Collection();
        setTextCommandMetas(metas);
    }
    return metas;
}
exports.getTextCommandMetas = getTextCommandMetas;
/**
 * Updates the set of @command metas.
 * @param metas All TextCommandMeta objects.
 * @returns
 */
function setTextCommandMetas(metas) {
    return Reflect.defineMetadata(COMMAND_METADATA, metas, TextCommandMeta_1.TextCommandMeta);
}
exports.setTextCommandMetas = setTextCommandMetas;
/**
 * Get the command metdata for a particular class.
 * @param target Target class object.
 * @returns
 */
function getTextCommandMeta(target) {
    const metas = getTextCommandMetas();
    let meta = metas.get(target);
    if (meta === undefined) {
        meta = new TextCommandMeta_1.TextCommandMeta();
        meta.target = target;
        metas.set(target, meta);
    }
    return meta;
}
exports.getTextCommandMeta = getTextCommandMeta;
/**
 * Get the metadata for a particular argument.
 * @param target Target class object.
 * @param argName Target argument field name.
 * @returns
 */
function getTextArgMeta(target, argName) {
    const meta = getTextCommandMeta(target);
    return meta.getArgMeta(argName);
}
exports.getTextArgMeta = getTextArgMeta;
/**
 * Add a method as a validator for an argument.
 * @param target Target class object.
 * @param argName Target argument field name.
 * @param methodName Validator method name.
 * @returns
 */
function addTextValidatorMethod(target, argName, methodName) {
    const meta = getTextArgMeta(target, argName);
    return meta.validatorMethods.add(methodName);
}
exports.addTextValidatorMethod = addTextValidatorMethod;
/**
 * Add an installer for a Validator for the given argument.
 * @param target Target class object.
 * @param argName Target argument field name.
 * @param installer Validator installer.
 */
function addTextArgValidator(target, argName, installer) {
    const meta = getTextArgMeta(target, argName);
    meta.validatorInstallers.push(installer);
}
exports.addTextArgValidator = addTextArgValidator;
/**
 * Get all @parser metas.
 * @returns A Collection of all Parser metas.
 */
function getTextParserMetas() {
    let metas = Reflect.getMetadata(PARSER_METADATA, TextArgParserMeta_1.TextArgParserMeta);
    if (metas === undefined) {
        metas = new Set();
        setTextParserMetas(metas);
    }
    return metas;
}
exports.getTextParserMetas = getTextParserMetas;
/**
 * Update the set of @parser metas.
 * @param metas Collection of @parser metas.
 * @returns
 */
function setTextParserMetas(metas) {
    return Reflect.defineMetadata(PARSER_METADATA, metas, TextArgParserMeta_1.TextArgParserMeta);
}
exports.setTextParserMetas = setTextParserMetas;
/**
 * Register a class as a parser.
 * @param target Target parser class.
 */
function registerTextParser(target) {
    const metas = getTextParserMetas();
    const meta = new TextArgParserMeta_1.TextArgParserMeta();
    meta.type = target;
    metas.add(meta);
}
exports.registerTextParser = registerTextParser;
//# sourceMappingURL=api.js.map
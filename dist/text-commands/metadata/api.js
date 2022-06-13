"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerParser = exports.setParserMetas = exports.getParserMetas = exports.addArgValidator = exports.addValidatorMethod = exports.getArgMeta = exports.getCommandMeta = exports.setCommandMetas = exports.getCommandMetas = void 0;
const discord_js_1 = require("discord.js");
const ParserMeta_1 = require("./ParserMeta");
const TextCommandMeta_1 = require("./TextCommandMeta");
const PARSER_METADATA = Symbol("Hades:ParserMetadata");
const COMMAND_METADATA = Symbol("Hades:CommandMetadata");
function getCommandMetas() {
    let metas = Reflect.getMetadata(COMMAND_METADATA, TextCommandMeta_1.TextCommandMeta);
    if (metas === undefined) {
        metas = new discord_js_1.Collection();
        setCommandMetas(metas);
    }
    return metas;
}
exports.getCommandMetas = getCommandMetas;
function setCommandMetas(metas) {
    return Reflect.defineMetadata(COMMAND_METADATA, metas, TextCommandMeta_1.TextCommandMeta);
}
exports.setCommandMetas = setCommandMetas;
function getCommandMeta(target) {
    const metas = getCommandMetas();
    let meta = metas.get(target);
    if (meta === undefined) {
        meta = new TextCommandMeta_1.TextCommandMeta();
        meta.target = target;
        metas.set(target, meta);
    }
    return meta;
}
exports.getCommandMeta = getCommandMeta;
function getArgMeta(target, argName) {
    const meta = getCommandMeta(target);
    return meta.getArgMeta(argName);
}
exports.getArgMeta = getArgMeta;
function addValidatorMethod(target, argName, methodName) {
    const meta = getArgMeta(target, argName);
    return meta.validatorMethods.add(methodName);
}
exports.addValidatorMethod = addValidatorMethod;
function addArgValidator(target, argName, installer) {
    const meta = getArgMeta(target, argName);
    meta.validatorInstallers.push(installer);
}
exports.addArgValidator = addArgValidator;
function getParserMetas() {
    let metas = Reflect.getMetadata(PARSER_METADATA, ParserMeta_1.ParserMeta);
    if (metas === undefined) {
        metas = new Set();
        setParserMetas(metas);
    }
    return metas;
}
exports.getParserMetas = getParserMetas;
function setParserMetas(metas) {
    return Reflect.defineMetadata(PARSER_METADATA, metas, ParserMeta_1.ParserMeta);
}
exports.setParserMetas = setParserMetas;
function registerParser(target) {
    const metas = getParserMetas();
    const meta = new ParserMeta_1.ParserMeta();
    meta.type = target;
    metas.add(meta);
}
exports.registerParser = registerParser;
//# sourceMappingURL=api.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTextParser = exports.setTextParserMetas = exports.getTextParserMetas = exports.addTextArgValidator = exports.addTextValidatorMethod = exports.getTextArgMeta = exports.getTextCommandMeta = exports.setTextCommandMetas = exports.getTextCommandMetas = void 0;
const discord_js_1 = require("discord.js");
const TextArgParserMeta_1 = require("./TextArgParserMeta");
const TextCommandMeta_1 = require("./TextCommandMeta");
const PARSER_METADATA = Symbol("Hades:ParserMetadata");
const COMMAND_METADATA = Symbol("Hades:CommandMetadata");
function getTextCommandMetas() {
    let metas = Reflect.getMetadata(COMMAND_METADATA, TextCommandMeta_1.TextCommandMeta);
    if (metas === undefined) {
        metas = new discord_js_1.Collection();
        setTextCommandMetas(metas);
    }
    return metas;
}
exports.getTextCommandMetas = getTextCommandMetas;
function setTextCommandMetas(metas) {
    return Reflect.defineMetadata(COMMAND_METADATA, metas, TextCommandMeta_1.TextCommandMeta);
}
exports.setTextCommandMetas = setTextCommandMetas;
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
function getTextArgMeta(target, argName) {
    const meta = getTextCommandMeta(target);
    return meta.getArgMeta(argName);
}
exports.getTextArgMeta = getTextArgMeta;
function addTextValidatorMethod(target, argName, methodName) {
    const meta = getTextArgMeta(target, argName);
    return meta.validatorMethods.add(methodName);
}
exports.addTextValidatorMethod = addTextValidatorMethod;
function addTextArgValidator(target, argName, installer) {
    const meta = getTextArgMeta(target, argName);
    meta.validatorInstallers.push(installer);
}
exports.addTextArgValidator = addTextArgValidator;
function getTextParserMetas() {
    let metas = Reflect.getMetadata(PARSER_METADATA, TextArgParserMeta_1.TextArgParserMeta);
    if (metas === undefined) {
        metas = new Set();
        setTextParserMetas(metas);
    }
    return metas;
}
exports.getTextParserMetas = getTextParserMetas;
function setTextParserMetas(metas) {
    return Reflect.defineMetadata(PARSER_METADATA, metas, TextArgParserMeta_1.TextArgParserMeta);
}
exports.setTextParserMetas = setTextParserMetas;
function registerTextParser(target) {
    const metas = getTextParserMetas();
    const meta = new TextArgParserMeta_1.TextArgParserMeta();
    meta.type = target;
    metas.add(meta);
}
exports.registerTextParser = registerTextParser;
//# sourceMappingURL=api.js.map
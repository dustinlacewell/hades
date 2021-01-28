"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addArgValidator = exports.addValidatorMethod = exports.getArgMeta = exports.getCommandMeta = exports.setCommandMetas = exports.getCommandMetas = exports.registerParser = exports.setParserMetas = exports.getParserMetas = exports.CommandMeta = exports.ParserMeta = exports.ArgMeta = exports.ArgType = void 0;
const discord_js_1 = require("discord.js");
const PARSER_METADATA = Symbol("Hades:ParserMetadata");
const COMMAND_METADATA = Symbol("Hades:CommandMetadata");
var ArgType;
(function (ArgType) {
    ArgType["UNKNOWN"] = "???";
    ArgType["STRING"] = "string";
    ArgType["INTEGER"] = "integer";
    ArgType["FLOAT"] = "float";
    ArgType["CHANNELID"] = "channel-id";
    ArgType["USERID"] = "user-id";
    ArgType["ROLEID"] = "role-id";
    ArgType["CHANNEL"] = "channel";
    ArgType["GUILDCHANNEL"] = "guild-channel";
    ArgType["USER"] = "user";
    ArgType["MEMBER"] = "member";
    ArgType["ROLE"] = "role";
})(ArgType = exports.ArgType || (exports.ArgType = {}));
class ArgMeta {
    constructor() {
        this.validatorMethods = new Set();
        this.validatorInstallers = [];
    }
}
exports.ArgMeta = ArgMeta;
class ParserMeta {
}
exports.ParserMeta = ParserMeta;
class CommandMeta {
    constructor() {
        this.args = new discord_js_1.Collection();
    }
    getArgMeta(name) {
        let meta = this.args.get(name);
        if (meta === undefined) {
            meta = new ArgMeta();
            this.args.set(name, meta);
        }
        return meta;
    }
    addValidatorMethod(argName, methodName) {
        const arg = this.getArgMeta(argName);
        return arg.validatorMethods.add(methodName);
    }
}
exports.CommandMeta = CommandMeta;
function getParserMetas() {
    let metas = Reflect.getMetadata(PARSER_METADATA, ParserMeta);
    if (metas === undefined) {
        metas = new Set();
        setParserMetas(metas);
    }
    return metas;
}
exports.getParserMetas = getParserMetas;
function setParserMetas(metas) {
    return Reflect.defineMetadata(PARSER_METADATA, metas, ParserMeta);
}
exports.setParserMetas = setParserMetas;
function registerParser(target) {
    const metas = getParserMetas();
    const meta = new ParserMeta();
    meta.type = target;
    metas.add(meta);
}
exports.registerParser = registerParser;
function getCommandMetas() {
    let metas = Reflect.getMetadata(COMMAND_METADATA, CommandMeta);
    if (metas === undefined) {
        metas = new discord_js_1.Collection();
        setCommandMetas(metas);
    }
    return metas;
}
exports.getCommandMetas = getCommandMetas;
function setCommandMetas(metas) {
    return Reflect.defineMetadata(COMMAND_METADATA, metas, CommandMeta);
}
exports.setCommandMetas = setCommandMetas;
function getCommandMeta(target) {
    const metas = getCommandMetas();
    let meta = metas.get(target);
    if (meta === undefined) {
        meta = new CommandMeta();
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
//# sourceMappingURL=meta.js.map
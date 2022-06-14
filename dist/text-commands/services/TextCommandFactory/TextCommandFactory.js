"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextCommandFactory = void 0;
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const TextArgInstaller_1 = require("./TextArgInstaller");
const TextArgParserResolver_1 = require("./TextArgParserResolver");
const TextArgParserRegistry_1 = require("./TextArgParserRegistry");
const TextCommandHelpService_1 = require("./TextCommandHelpService");
class TextCommandFactory {
    constructor(parentContainer, meta) {
        this.args = new discord_js_1.Collection();
        this.parentContainer = parentContainer;
        this.name = meta.name;
        this.target = meta.target;
        this.description = meta.description;
        this.inferenceService = parentContainer.get(TextArgParserResolver_1.TextArgParserResolver);
        this.parserService = parentContainer.get(TextArgParserRegistry_1.TextArgParserRegistry);
        this.helpService = new TextCommandHelpService_1.TextCommandHelpService(this);
        // setup arguments
        for (let [argName, argMeta] of meta.args) {
            const parserType = argMeta.parserType || this.inferenceService.infer(argMeta.type);
            const parser = this.parserService.parserFor(parserType);
            const arg = new TextArgInstaller_1.TextArgInstaller(argMeta, parser);
            this.args.set(argName, arg);
        }
    }
    installArguments(container, context) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let [_, arg] of this.args) {
                yield arg.install(container, context);
            }
        });
    }
    runMethodValidators(inst) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let [_, arg] of this.args) {
                for (let methodName of arg.validatorMethods) {
                    const callable = inst[methodName];
                    if (callable) {
                        yield callable.apply(inst);
                    }
                }
            }
        });
    }
    createSubContainer(context) {
        const di = new inversify_1.Container({ skipBaseClassChecks: true });
        di.bind(this.target).to(this.target);
        di.bind("TextCommandContext").toConstantValue(context);
        di.parent = this.parentContainer;
        return di;
    }
    create(context) {
        return __awaiter(this, void 0, void 0, function* () {
            // subcontainer config
            const subContainer = this.createSubContainer(context);
            // parse, validate and bind argument values
            yield this.installArguments(subContainer, context);
            // resolve command instance
            const inst = subContainer.get(this.target);
            // run instance-method validators
            yield this.runMethodValidators(inst);
            return inst;
        });
    }
}
exports.TextCommandFactory = TextCommandFactory;
//# sourceMappingURL=TextCommandFactory.js.map
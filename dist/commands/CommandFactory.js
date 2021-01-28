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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const HelpService_1 = __importDefault(require("../services/HelpService"));
const InferenceService_1 = __importDefault(require("../services/InferenceService"));
const ParserService_1 = __importDefault(require("../services/ParserService"));
const Argument_1 = __importDefault(require("./Argument"));
class CommandFactory {
    constructor(parentContainer, meta) {
        var _a;
        this.args = new discord_js_1.Collection();
        this.parentContainer = parentContainer;
        console.log(`COMMAND FACTORY: ${meta.target.name}`);
        this.name = meta.name;
        this.target = meta.target;
        this.description = meta.description;
        this.helpService = new HelpService_1.default(this);
        this.inferenceService = parentContainer.get(InferenceService_1.default);
        this.parserService = parentContainer.get(ParserService_1.default);
        // setup arguments
        for (let [argName, argMeta] of meta.args) {
            console.log(`INFERRING ARG: ${argName} : ${(_a = argMeta.type) === null || _a === void 0 ? void 0 : _a.name}`);
            const parserType = argMeta.parserType || this.inferenceService.infer(argMeta.type);
            const parser = this.parserService.parserFor(parserType);
            const arg = new Argument_1.default(argMeta, parser);
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
        di.bind("CommandContext").toConstantValue(context);
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
exports.default = CommandFactory;
//# sourceMappingURL=CommandFactory.js.map
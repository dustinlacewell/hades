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
exports.SlashCommandFactory = void 0;
const discord_js_1 = require("discord.js");
const SlashArgInstaller_1 = require("./SlashArgInstaller");
const SlashArgParserRegistry_1 = require("./SlashArgParserRegistry");
const SlashArgParserResolver_1 = require("./SlashArgParserResolver");
/**
 * Instantiates commands on invocation.
 *
 * Every command class is associated with its own SlashCommandFactory. On
 * invocation of that command, the factory will do what's necessary to
 * create an instance of that command class suitable for execution.
 */
class SlashCommandFactory {
    constructor(parentContainer, meta) {
        /** arguments of the associated command */
        this.argInstallers = new discord_js_1.Collection();
        this.parentContainer = parentContainer;
        this.meta = meta;
        this.inferenceService = parentContainer.get(SlashArgParserResolver_1.SlashArgParserResolver);
        this.parserService = parentContainer.get(SlashArgParserRegistry_1.SlashArgParserRegistry);
        // setup arguments
        for (let [argName, argMeta] of meta.args) {
            const parserType = argMeta.parserType || this.inferenceService.infer(argMeta.type);
            const parser = this.parserService.parserFor(parserType);
            const arg = new SlashArgInstaller_1.SlashArgInstaller(argMeta, parser);
            this.argInstallers.set(argName, arg);
        }
    }
    /**
     * Parse and install argument values into a container.
     * @param container Container to install into.
     * @param context The command invocation context.
     */
    installArguments(container, context) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let [_, arg] of this.argInstallers) {
                yield arg.install(container, context);
            }
        });
    }
    /**
     * Invoke validator methods on the given command instance.
     * @param inst Command instance.
     */
    // async runMethodValidators(inst: any) {
    //     for (let [_, arg] of this.argInstallers) {
    //         for (let methodName of arg.validatorMethods) {
    //             const callable = inst[methodName];
    //             if (callable) {
    //                 await callable.apply(inst);
    //             }
    //         }
    //     }
    // }
    /**
     * Create a sub-container for resolving the command instance from.
     * @param context The parent container.
     * @returns A sub-container.
     */
    createSubContainer(context) {
        const di = this.parentContainer.createChild({ skipBaseClassChecks: true });
        // bind the command class
        di.bind(this.meta.target).toSelf();
        // bind the invocation context
        di.bind("SlashCommandContext").toConstantValue(context);
        // connect the containers
        di.parent = this.parentContainer;
        return di;
    }
    /**
     * Create an instance of the invoked command.
     * @param context A command invocation context.
     * @returns A command instance.
     */
    create(context) {
        return __awaiter(this, void 0, void 0, function* () {
            // subcontainer config
            const subContainer = this.createSubContainer(context);
            // parse, validate and bind argument values
            // await this.installArguments(subContainer, context);
            // resolve command instance
            const inst = subContainer.get(this.meta.target);
            // run instance-method validators
            // await this.runMethodValidators(inst);
            return inst;
        });
    }
}
exports.SlashCommandFactory = SlashCommandFactory;
//# sourceMappingURL=SlashCommandFactory.js.map
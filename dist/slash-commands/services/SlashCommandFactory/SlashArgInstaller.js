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
exports.SlashArgInstaller = void 0;
const errors_1 = require("../../errors");
/**
 * Binds argument values in a container.
 *
 * SlashArgInstaller is used by the SlashCommandFactory to inject the user-provided
 * value for a single command argument.
 */
class SlashArgInstaller {
    /** validator installers for this argument */
    // validatorInstallers: InstallerFunc[];
    /** methods for validating this argument's value */
    // validatorMethods: any;
    constructor(meta, parser) {
        this.name = meta.name;
        this.type = meta.type;
        this.property = meta.property;
        this.description = meta.description;
        this.parser = parser;
        this.parserType = meta.parserType;
        // this.validatorMethods = meta.validatorMethods;
        // this.validatorInstallers = meta.validatorInstallers;
    }
    /**
     * Install the user's value for a given argument into the container.
     * @param di A container to bind the argument value in
     * @param context The context for the command invocation
     */
    install(di, context) {
        return __awaiter(this, void 0, void 0, function* () {
            // parse value
            const value = yield this.parse(context);
            // install validators
            // this.installValidators(di);
            // resolve and run validators
            // await this.executeValidators(di, context, value);
            // finally bind the validated value in the subcontainer
            di.bind(this.property).toConstantValue(value);
        });
    }
    throwIfValueIsEmpty(value) {
        if (value === null || value === undefined) {
            throw new errors_1.SlashArgError(`argument \`${this.name}\` must be a ${this.parser.name}.`, true);
        }
    }
    parse(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.parser.parse(this, context);
            this.throwIfValueIsEmpty(value);
            return value;
        });
    }
}
exports.SlashArgInstaller = SlashArgInstaller;
//# sourceMappingURL=SlashArgInstaller.js.map
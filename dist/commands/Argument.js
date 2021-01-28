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
const ArgError_1 = __importDefault(require("./ArgError"));
const Validator_1 = __importDefault(require("../validators/Validator"));
class Argument {
    constructor(meta, parser) {
        this.name = meta.name;
        this.type = meta.type;
        this.property = meta.property;
        this.description = meta.description;
        this.parser = parser;
        this.parserType = meta.parserType;
        this.validatorMethods = meta.validatorMethods;
        this.validatorInstallers = meta.validatorInstallers;
    }
    install(di, context) {
        return __awaiter(this, void 0, void 0, function* () {
            // parse value
            const value = yield this.parse(context);
            // install validators
            this.installValidators(di);
            // resolve and run validators
            yield this.executeValidators(di, context, value);
            // finally bind the validated value in the subcontainer
            di.bind(this.property).toConstantValue(value);
        });
    }
    throwIfValueIsEmpty(value) {
        if (value === null || value === undefined) {
            throw new ArgError_1.default(`argument \`${this.name}\` must be a ${this.parser.name}.`, true);
        }
    }
    parse(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.parser.parse(this, context);
            this.throwIfValueIsEmpty(value);
            return value;
        });
    }
    installValidators(di) {
        for (let installer of this.validatorInstallers) {
            installer(di);
        }
    }
    executeValidators(di, context, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (di.isBoundNamed(Validator_1.default, this.property)) {
                const validators = di.getAllNamed(Validator_1.default, this.property);
                for (let validator of validators) {
                    yield validator.validate(this, context, value);
                }
            }
        });
    }
}
exports.default = Argument;
//# sourceMappingURL=Argument.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.singleton = exports.description = exports.command = exports.arg = void 0;
const arg_1 = __importDefault(require("./arg"));
exports.arg = arg_1.default;
const command_1 = __importDefault(require("./command"));
exports.command = command_1.default;
const description_1 = __importDefault(require("./description"));
exports.description = description_1.default;
const singleton_1 = __importDefault(require("./singleton"));
exports.singleton = singleton_1.default;
const validate_1 = __importDefault(require("./validate"));
exports.validate = validate_1.default;
//# sourceMappingURL=index.js.map
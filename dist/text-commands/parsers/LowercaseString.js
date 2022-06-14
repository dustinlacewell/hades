"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.LowercaseStringParser = void 0;
const decorators_1 = require("../decorators");
const Parser_1 = require("./Parser");
const errors_1 = require("../errors");
const isLowercaseString = (str) => {
    // check if str is lowercase
    return str === str.toLowerCase();
};
let LowercaseStringParser = class LowercaseStringParser extends Parser_1.Parser {
    constructor() {
        super(...arguments);
        this.name = 'lowercase-string';
        this.description = 'An lowercase string. Use "QUOTES FOR SPACES".';
    }
    parse(arg, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const str = context.reader.getString();
            if (isLowercaseString(str)) {
                return str;
            }
            throw new errors_1.TextArgError(`Expected an lowercase string, got "${str}".`);
        });
    }
};
LowercaseStringParser = __decorate([
    (0, decorators_1.parser)()
], LowercaseStringParser);
exports.LowercaseStringParser = LowercaseStringParser;
//# sourceMappingURL=LowercaseString.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Validator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const inversify_1 = require("inversify");
const metadata_1 = require("../metadata");
let Validator = Validator_1 = class Validator {
    validate(arg, ctx, value) {
        return;
    }
    static check() {
        return (target, key) => {
            (0, metadata_1.addArgValidator)(target.constructor, key, (di) => {
                di
                    .bind(Validator_1)
                    .to(this)
                    .whenTargetNamed(key);
            });
        };
    }
};
Validator = Validator_1 = __decorate([
    (0, inversify_1.injectable)()
], Validator);
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map
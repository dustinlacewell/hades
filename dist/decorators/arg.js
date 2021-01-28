"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const meta_1 = require("../meta");
function camelToDash(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function arg(info) {
    return (target, key) => {
        const meta = meta_1.getArgMeta(target.constructor, key);
        meta.name = camelToDash(key);
        meta.type = Reflect.getMetadata("design:type", target, key);
        meta.property = key;
        meta.validatorMethods = new Set();
        meta.validatorInstallers = [];
        if (info) {
            meta.name = info.name || camelToDash(key);
            meta.description = info.description;
            meta.validatorMethods = info.validatorMethods || meta.validatorMethods;
            meta.validatorInstallers = info.validatorInstallers || meta.validatorInstallers;
        }
        inversify_1.inject(key)(target, key);
    };
}
exports.default = arg;
;
//# sourceMappingURL=arg.js.map
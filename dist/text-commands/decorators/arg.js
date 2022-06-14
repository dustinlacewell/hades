"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arg = void 0;
const inversify_1 = require("inversify");
const metadata_1 = require("../metadata");
const utils_1 = require("../utils");
function arg(info) {
    return (target, key) => {
        const meta = (0, metadata_1.getArgMeta)(target.constructor, key);
        meta.name = (0, utils_1.camelToDash)(key);
        meta.property = key;
        if (info) {
            meta.name = info.name || (0, utils_1.camelToDash)(key);
            meta.description = info.description || info.description;
            meta.parserType = info.parser || meta.parserType;
            meta.validatorMethods = info.validatorMethods || meta.validatorMethods;
            meta.validatorInstallers = info.validatorInstallers || meta.validatorInstallers;
        }
        (0, inversify_1.inject)(key)(target, key);
    };
}
exports.arg = arg;
;
//# sourceMappingURL=arg.js.map
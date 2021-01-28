"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const meta_1 = require("../meta");
function command(name) {
    return (target) => {
        const meta = meta_1.getCommandMeta(target);
        meta.name = name;
        meta.target = target;
        return inversify_1.injectable()(target);
    };
}
exports.default = command;
//# sourceMappingURL=command.js.map
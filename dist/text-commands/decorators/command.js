"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const inversify_1 = require("inversify");
const metadata_1 = require("../metadata");
function command(name) {
    return (target) => {
        const meta = (0, metadata_1.getCommandMeta)(target);
        meta.name = name;
        meta.target = target;
        return (0, inversify_1.injectable)()(target);
    };
}
exports.command = command;
//# sourceMappingURL=command.js.map
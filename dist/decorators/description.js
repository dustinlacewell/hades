"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_1 = require("../meta");
function description(msg) {
    function DD(target, key) {
        if (key) {
            // arg description
            const constructable = target;
            const meta = meta_1.getArgMeta(constructable.constructor, key);
            meta.description = msg;
        }
        else {
            // command description
            const ctor = target;
            const meta = meta_1.getCommandMeta(ctor);
            meta.description = msg;
            return ctor;
        }
    }
    return DD;
}
exports.default = description;
//# sourceMappingURL=description.js.map
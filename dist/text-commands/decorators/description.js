"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
const metadata_1 = require("../metadata");
/**
 * Sets the description on a @command or @arg decorated target.
 * @param msg The description.
 */
function description(msg) {
    function DD(target, key) {
        if (key) {
            // arg description
            const constructable = target;
            const meta = (0, metadata_1.getTextArgMeta)(constructable.constructor, key);
            meta.description = msg;
        }
        else {
            // command description
            const ctor = target;
            const meta = (0, metadata_1.getTextCommandMeta)(ctor);
            meta.description = msg;
            return ctor;
        }
    }
    return DD;
}
exports.description = description;
//# sourceMappingURL=description.js.map
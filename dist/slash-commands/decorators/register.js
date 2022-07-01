"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const metadata_1 = require("../metadata");
/**
 * Registers discord slash command details
 * @param name The command's discord registration options.
 */
function register(registrationDetails) {
    return (target) => {
        const meta = (0, metadata_1.getSlashCommandMeta)(target);
        meta.registrationDetails = registrationDetails;
        // meta.target = target;
        // return injectable()(target);
    };
}
exports.register = register;
//# sourceMappingURL=register.js.map
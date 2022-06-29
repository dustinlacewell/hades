"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const inversify_1 = require("inversify");
const metadata_1 = require("../metadata");
/**
 * Marks a SlashCommand class as a command.
 * @param name The command's name.
 */
function command(name, registrationDetails) {
    return (target) => {
        const meta = (0, metadata_1.getSlashCommandMeta)(target);
        meta.name = name;
        meta.registrationDetails = registrationDetails;
        meta.target = target;
        return (0, inversify_1.injectable)()(target);
    };
}
exports.command = command;
//# sourceMappingURL=command.js.map
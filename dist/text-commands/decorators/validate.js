"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const metadata_1 = require("../metadata");
/**
 * Marks method as validator for named argument.
 * @param name Name of argument to validate.
 */
function validate(name) {
    return ({ constructor }, key, _) => {
        (0, metadata_1.addTextValidatorMethod)(constructor, name, key);
    };
}
exports.validate = validate;
//# sourceMappingURL=validate.js.map
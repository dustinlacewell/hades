"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const metadata_1 = require("../metadata");
function validate(name) {
    return ({ constructor }, key, _) => {
        (0, metadata_1.addValidatorMethod)(constructor, name, key);
    };
}
exports.validate = validate;
//# sourceMappingURL=validate.js.map
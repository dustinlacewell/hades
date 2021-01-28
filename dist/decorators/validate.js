"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_1 = require("../meta");
function validate(name) {
    return ({ constructor }, key, _) => {
        meta_1.addValidatorMethod(constructor, name, key);
    };
}
exports.default = validate;
//# sourceMappingURL=validate.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToDash = void 0;
/**
 * Convert a string from CamelCase to dashed-style.
 * @param myStr String to convert.
 */
function camelToDash(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
exports.camelToDash = camelToDash;
//# sourceMappingURL=camelToDash.js.map
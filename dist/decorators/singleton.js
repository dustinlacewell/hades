"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleton = void 0;
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
/**
 * Binds a decorated class as a singleton.
 * @param identifier Identifier token to bind to.
 */
function singleton(identifier) {
    return (0, inversify_binding_decorators_1.fluentProvide)(identifier)
        .inSingletonScope()
        .done();
}
exports.singleton = singleton;
;
//# sourceMappingURL=singleton.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleton = void 0;
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
function singleton(identifier) {
    return (0, inversify_binding_decorators_1.fluentProvide)(identifier)
        .inSingletonScope()
        .done();
}
exports.singleton = singleton;
;
//# sourceMappingURL=singleton.js.map
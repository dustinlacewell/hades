"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
function singleton(identifier) {
    return inversify_binding_decorators_1.fluentProvide(identifier)
        .inSingletonScope()
        .done();
}
exports.default = singleton;
;
//# sourceMappingURL=singleton.js.map
"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HadesContainer = void 0;
const inversify_1 = require("inversify");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const inversify_config_injection_1 = require("inversify-config-injection");
class HadesContainer extends inversify_1.Container {
    constructor(options) {
        const _a = options || {}, { installers } = _a, containerOptions = __rest(_a, ["installers"]);
        super(Object.assign(Object.assign({}, containerOptions), { skipBaseClassChecks: true }));
        this.bind(HadesContainer).toConstantValue(this);
        this.load((0, inversify_binding_decorators_1.buildProviderModule)()); // binding-decorators support
        this.loadConfigurationModule();
        for (const installer of installers || []) {
            installer(this);
        }
    }
    loadConfigurationModule() {
        const configBinder = new inversify_config_injection_1.EagerBinder({ prefix: 'cfg' });
        const configCallback = configBinder.getModuleFunction();
        const configModule = new inversify_1.ContainerModule(configCallback);
        this.load(configModule);
    }
}
exports.HadesContainer = HadesContainer;
//# sourceMappingURL=HadesContainer.js.map
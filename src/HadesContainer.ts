import { Container, ContainerModule, interfaces } from "inversify";
import { buildProviderModule } from 'inversify-binding-decorators';
import { EagerBinder } from "inversify-config-injection";


export type HadesContainerOptions = interfaces.ContainerOptions & {
    installers?: ((container: Container) => void)[];
}

export class HadesContainer extends Container {
    constructor(options?: HadesContainerOptions) {
        const { installers, ...containerOptions } = options || {};
        super({ ...containerOptions, skipBaseClassChecks: true });
        this.bind(HadesContainer).toConstantValue(this);
        this.load(buildProviderModule()); // binding-decorators support
        this.loadConfigurationModule();
        for (const installer of installers || []) {
            installer(this);
        }
    }

    private loadConfigurationModule() {
        const configBinder = new EagerBinder({ prefix: 'cfg' });
        const configCallback = configBinder.getModuleFunction();
        const configModule = new ContainerModule(configCallback);
        this.load(configModule);
    }
}


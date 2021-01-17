import { Container, ContainerModule, interfaces } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { EagerBinder } from 'inversify-config-injection';
import Command from './commands/Command';
import { commandRegistry } from './decorators/command';


export default class HadesContainer extends Container {
    constructor(options?: interfaces.ContainerOptions) {
        super({ ...options, skipBaseClassChecks: true });

        const configBinder = new EagerBinder({
            prefix: 'cfg',
        });
        const configCallback = configBinder.getModuleFunction();
        const configModule = new ContainerModule(configCallback);

        this.load(configModule);
        this.load(buildProviderModule());

        for (let name in commandRegistry) {
            const commandClass = commandRegistry[name];
            this.bind(Command).to(commandClass);
        }
    }
}

import { Container, interfaces } from 'inversify';
export default class HadesContainer extends Container {
    constructor(options?: interfaces.ContainerOptions);
    private bindCommandFactories;
    private bindDecoratedParsers;
    private loadDecoratorSupport;
    private loadConfigurationModule;
    private bindDefaultMappedTypes;
}

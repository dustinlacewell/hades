import { Container, interfaces } from "inversify";
export declare type HadesContainerOptions = interfaces.ContainerOptions & {
    installers?: ((container: Container) => void)[];
};
export declare class HadesContainer extends Container {
    constructor(options?: HadesContainerOptions);
    private loadConfigurationModule;
}

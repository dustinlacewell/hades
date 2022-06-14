import { Container, interfaces } from "inversify";
import { Installer } from "./Installer";
import { InstallerFunc } from "./utils";
export declare type HadesContainerOptions = interfaces.ContainerOptions & {
    installers?: (Installer | InstallerFunc)[];
};
export declare class HadesContainer extends Container {
    constructor(options?: HadesContainerOptions);
    private loadConfigurationModule;
}

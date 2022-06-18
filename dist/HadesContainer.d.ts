import { Container, interfaces } from "inversify";
import { Installer } from "./Installer";
import { InstallerFunc } from "./utils";
export declare type HadesContainerOptions = interfaces.ContainerOptions & {
    installers?: (Installer | InstallerFunc)[];
};
/**
 * An Inversify container for building bots with Hades.
 */
export declare class HadesContainer extends Container {
    constructor(options?: HadesContainerOptions);
    /**
     * Enables inverisfy-config-injection support.
     */
    private loadConfigurationModule;
}

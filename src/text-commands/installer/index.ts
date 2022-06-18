import { Container } from "inversify";
import { Installer } from "../../Installer";
import { installCommands } from "./installCommands";
import { defaultMappedTypes, installDefaultMappedTypes, TypePair } from "./installDefaultMappedTypes";
import { installParsers } from "./installParsers";

export { defaultMappedTypes, TypePair } from "./installDefaultMappedTypes";


/**
 * Installs text command support in HadesContainer.
 */
export class TextCommandsInstaller extends Installer {
    constructor(
        private readonly mappedTypes: TypePair[] = defaultMappedTypes
    ) {
        super();
    }

    async install(container: Container) {
        installDefaultMappedTypes(container, this.mappedTypes);
        installParsers(container);
        installCommands(container);
    }
}
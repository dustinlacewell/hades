import { Container } from "inversify";
import { Installer } from "../../Installer";
import { installCommands } from "./installCommands";
import { defaultMappedTypes, installDefaultMappedTypes, TypePair } from "./installDefaultMappedTypes";
import { installParsers } from "./installParsers";

/**
 * Installs slash command support in HadesContainer.
 */
export class SlashCommandsInstaller extends Installer {
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
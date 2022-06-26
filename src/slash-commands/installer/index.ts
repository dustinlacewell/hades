import { Container } from "inversify";
import { Installer } from "../../Installer";
// import { installCommands } from "./installCommands";
import { installParsers } from "./installParsers";

/**
 * Installs slash command support in HadesContainer.
 */
export class SlashCommandsInstaller extends Installer {
    constructor() {
        super();
    }

    async install(container: Container) {
        installParsers(container);
        // installCommands(container);
    }
}
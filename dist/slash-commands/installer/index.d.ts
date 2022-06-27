import { Container } from "inversify";
import { Installer } from "../../Installer";
import { TypePair } from "./installDefaultMappedTypes";
/**
 * Installs slash command support in HadesContainer.
 */
export declare class SlashCommandsInstaller extends Installer {
    private readonly mappedTypes;
    constructor(mappedTypes?: TypePair[]);
    install(container: Container): Promise<void>;
}

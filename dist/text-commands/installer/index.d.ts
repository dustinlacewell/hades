import { Container } from "inversify";
import { Installer } from "../../Installer";
import { TypePair } from "./installDefaultMappedTypes";
export { defaultMappedTypes, TypePair } from "./installDefaultMappedTypes";
export declare class TextCommandsInstaller extends Installer {
    private readonly mappedTypes;
    constructor(mappedTypes?: TypePair[]);
    install(container: Container): Promise<void>;
}

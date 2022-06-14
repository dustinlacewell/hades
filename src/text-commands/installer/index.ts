import { Container } from "inversify";
import { Installer } from "../../Installer";
import { installCommandFactories } from "./installCommandFactories";
import { defaultMappedTypes, installDefaultMappedTypes, TypePair } from "./installDefaultMappedTypes";
import { installParsers } from "./installParsers";

export { defaultMappedTypes, TypePair } from "./installDefaultMappedTypes";

export class TextCommandsInstaller extends Installer {
    constructor(
        private readonly mappedTypes: TypePair[] = defaultMappedTypes
    ) {
        super();
    }

    async install(container: Container) {
        installDefaultMappedTypes(container, this.mappedTypes);
        installParsers(container);
        installCommandFactories(container);
    }
}
import { Container } from "inversify";
import { installCommandFactories } from "./installCommandFactories";
import { installDefaultMappedTypes } from "./installDefaultMappedTypes";
import { installParsers } from "./installParsers";


export const installTextCommands = (container: Container) => {
    installDefaultMappedTypes(container);
    installParsers(container);
    installCommandFactories(container);
}
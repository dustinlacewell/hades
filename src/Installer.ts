import { Container } from "inversify";


export abstract class Installer {
    abstract install(container: Container): Promise<void>;
}
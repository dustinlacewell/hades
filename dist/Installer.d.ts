import { Container } from "inversify";
export declare abstract class Installer {
    abstract install(container: Container): Promise<void>;
}

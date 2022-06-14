import { TextArgParser } from "../parsers";
import { Constructor, InstallerFunc, Newable } from "../../utils";
/**
 * Decorator metdata for command arguments.
 */
export declare class TextArgMeta {
    name?: string;
    type?: Constructor;
    property?: string;
    description?: string;
    parserType?: Newable<TextArgParser>;
    validatorMethods: Set<string>;
    validatorInstallers: InstallerFunc[];
}

import { Parser } from "../parsers";
import { Constructor, Newable, Installer } from "../../utils";
/**
 * Decorator metdata for command arguments.
 */
export declare class TextArgMeta {
    name?: string;
    type?: Constructor;
    property?: string;
    description?: string;
    parserType?: Newable<Parser>;
    validatorMethods: Set<string>;
    validatorInstallers: Installer[];
}

import { TextArgParser } from "../parsers";
import { Constructor, Newable, Installer } from "../../utils";

/**
 * Decorator metdata for command arguments.
 */
export class TextArgMeta {
    name?: string;
    type?: Constructor;
    property?: string;
    description?: string;

    parserType?: Newable<TextArgParser>;
    validatorMethods = new Set<string>();
    validatorInstallers: Installer[] = [];
}
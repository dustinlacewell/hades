import { Constructable, InstallerFunc, Newable } from "../../utils";
import { TextArgParser } from "../parsers/TextArgParser";
/**
 * Options for the @arg decorator.
 */
export declare type ArgInfo = {
    /** name of the argument */
    name?: string;
    /** type of the argument */
    type?: string;
    /** which parser should be used */
    parser?: Newable<TextArgParser>;
    /** help description */
    description?: string;
    /** methods to validate this argument */
    validatorMethods?: Set<string>;
    /** installers for Validators */
    validatorInstallers?: InstallerFunc[];
};
/**
 * Marks the field of a TextCommand as an argument.
 * @param info Options for the decorator.
 */
export declare function arg(info?: ArgInfo): (target: Constructable, key: string) => void;

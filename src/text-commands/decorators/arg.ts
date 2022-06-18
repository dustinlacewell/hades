import { inject } from "inversify";

import { getTextArgMeta } from "../metadata";
import { Constructable, InstallerFunc, Newable } from "../../utils";
import { TextArgParser } from "../parsers/TextArgParser";
import { camelToDash } from "../utils";


/**
 * Options for the @arg decorator.
 */
export type ArgInfo = {
    /** name of the argument */
    name?: string,
    /** type of the argument */
    type?: string,
    /** which parser should be used */
    parser?: Newable<TextArgParser>,
    /** help description */
    description?: string,
    /** methods to validate this argument */
    validatorMethods?: Set<string>,
    /** installers for Validators */
    validatorInstallers?: InstallerFunc[],
};

/**
 * Marks the field of a TextCommand as an argument.
 * @param info Options for the decorator.
 */
export function arg(info?: ArgInfo) {
    return (target: Constructable, key: string) => {
        const meta = getTextArgMeta(target.constructor, key);
        meta.name = camelToDash(key);
        // get design:type from the constructor
        const typeInfo = Reflect.getMetadata("design:type", target, key).name;
        meta.type = typeInfo
        meta.property = key;
        if (info) {
            meta.name = info.name || camelToDash(key);
            meta.description = info.description || info.description;
            meta.parserType = info.parser || meta.parserType;
            meta.validatorMethods = info.validatorMethods || meta.validatorMethods;
            meta.validatorInstallers = info.validatorInstallers || meta.validatorInstallers;
        }
        // decorate the field with @inject(key)
        inject(key)(target, key);
    };
};



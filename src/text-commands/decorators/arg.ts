import { inject } from "inversify";

import { getTextArgMeta } from "../metadata";
import { Constructable, InstallerFunc, Newable } from "../../utils";
import { TextArgParser } from "../parsers/TextArgParser";
import { camelToDash } from "../utils";


export type ArgInfo = {
    name?: string,
    type?: string,
    parser?: Newable<TextArgParser>,
    description?: string,
    validatorMethods?: Set<string>,
    validatorInstallers?: InstallerFunc[],
};

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
        inject(key)(target, key);
    };
};



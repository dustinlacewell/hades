import { inject } from "inversify";

import { getArgMeta } from "../metadata";
import { Constructable, Installer, Newable } from "../../utils";
import { Parser } from "../parsers/Parser";
import { camelToDash } from "../utils";


export type ArgInfo = {
    name?: string,
    parser?: Newable<Parser>,
    description?: string,
    validatorMethods?: Set<string>,
    validatorInstallers?: Installer[],
};

export function arg(info?: ArgInfo) {
    return (target: Constructable, key: string) => {
        const meta = getArgMeta(target.constructor, key);
        meta.name = camelToDash(key);
        meta.type = Reflect.getMetadata("design:type", target, key);
        meta.property = key;
        meta.validatorMethods = new Set<string>();
        meta.validatorInstallers = [];
        if (info) {
            meta.name = info.name || camelToDash(key);
            meta.description = info.description;
            meta.validatorMethods = info.validatorMethods || meta.validatorMethods;
            meta.validatorInstallers = info.validatorInstallers || meta.validatorInstallers;
        }
        inject(key)(target, key);
    };
};



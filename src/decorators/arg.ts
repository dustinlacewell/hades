import { inject } from "inversify";

import { getArgMeta } from "../meta";
import { Constructable, Installer, Newable } from "../utils";
import Parser from "../parsers/Parser";


function camelToDash(myStr: string) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export type ArgInfo = {
    name?: string,
    parser?: Newable<Parser>,
    description?: string,
    validatorMethods?: Set<string>,
    validatorInstallers?: Installer[],
};

export default function arg(info?: ArgInfo) {
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



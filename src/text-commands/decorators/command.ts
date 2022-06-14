import { injectable } from "inversify";

import { getTextCommandMeta } from "../metadata";


export function command(name: string) {
    return (target: any) => {
        const meta = getTextCommandMeta(target);
        meta.name = name;
        meta.target = target;
        return injectable()(target);
    }
}

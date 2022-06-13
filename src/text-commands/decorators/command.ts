import { injectable } from "inversify";

import { getCommandMeta } from "../metadata";


export function command(name: string) {
    return (target: any) => {
        const meta = getCommandMeta(target);
        meta.name = name;
        meta.target = target;
        return injectable()(target);
    }
}

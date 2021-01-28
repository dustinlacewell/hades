import { injectable } from "inversify";

import { getCommandMeta } from "../meta";
import { Constructor } from "../utils";


export default function command(name: string) {
    return (target: Constructor) => {
        const meta = getCommandMeta(target);
        meta.name = name;
        meta.target = target;
        return injectable()(target);
    }
}

import { injectable } from "inversify";

import { getTextCommandMeta } from "../metadata";


/**
 * Marks a TextCommand class as a command.
 * @param name The command's name.
 */
export function command(name: string) {
    return (target: any) => {
        const meta = getTextCommandMeta(target);
        meta.name = name;
        meta.target = target;
        return injectable()(target);
    }
}

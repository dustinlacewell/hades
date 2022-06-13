import { Collection } from "discord.js";

import { Parser } from "../parsers/Parser";
import { Constructor, Installer, Newable } from "../../utils";
import { TextArgMeta } from "./TextArgMeta";



export class TextCommandMeta {
    name: string;
    target: Constructor;
    args = new Collection<string, TextArgMeta>();
    description?: string;

    getArgMeta(name: string) {
        let meta = this.args.get(name)
        if (meta === undefined) {
            meta = new TextArgMeta();
            this.args.set(name, meta);
        }
        return meta;
    }

    addValidatorMethod(argName: string, methodName: string) {
        const arg = this.getArgMeta(argName);
        return arg.validatorMethods.add(methodName);
    }
}
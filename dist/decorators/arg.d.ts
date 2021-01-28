import { Constructable, Installer, Newable } from "../utils";
import Parser from "../parsers/Parser";
export declare type ArgInfo = {
    name?: string;
    parser?: Newable<Parser>;
    description?: string;
    validatorMethods?: Set<string>;
    validatorInstallers?: Installer[];
};
export default function arg(info?: ArgInfo): (target: Constructable, key: string) => void;

import { Constructable, Installer, Newable } from "../../utils";
import { TextArgParser } from "../parsers/TextArgParser";
export declare type ArgInfo = {
    name?: string;
    parser?: Newable<TextArgParser>;
    description?: string;
    validatorMethods?: Set<string>;
    validatorInstallers?: Installer[];
};
export declare function arg(info?: ArgInfo): (target: Constructable, key: string) => void;

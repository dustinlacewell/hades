import { Constructable, InstallerFunc, Newable } from "../../utils";
import { TextArgParser } from "../parsers/TextArgParser";
export declare type ArgInfo = {
    name?: string;
    type?: string;
    parser?: Newable<TextArgParser>;
    description?: string;
    validatorMethods?: Set<string>;
    validatorInstallers?: InstallerFunc[];
};
export declare function arg(info?: ArgInfo): (target: Constructable, key: string) => void;

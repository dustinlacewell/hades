import { Constructor, Newable } from "../../utils";
import { SlashArgParser } from "../parsers/SlashArgParser";
/**
 * Decorator metdata for command arguments.
 */
export declare class SlashArgMeta {
    name?: string;
    type?: Constructor;
    property?: string;
    description?: string;
    parserType?: Newable<SlashArgParser>;
}

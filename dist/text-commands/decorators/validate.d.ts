import { Constructable } from "../../utils";
/**
 * Marks method as validator for named argument.
 * @param name Name of argument to validate.
 */
export declare function validate(name: string): ({ constructor }: Constructable, key: string, _: PropertyDescriptor) => void;

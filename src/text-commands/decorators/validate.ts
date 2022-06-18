import { addTextValidatorMethod } from "../metadata";
import { Constructable } from "../../utils";


/**
 * Marks method as validator for named argument.
 * @param name Name of argument to validate.
 */
export function validate(name: string) {
    return ({ constructor }: Constructable, key: string, _: PropertyDescriptor) => {
        addTextValidatorMethod(constructor, name, key);
    }
}

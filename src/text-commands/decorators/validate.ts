import { addValidatorMethod } from "../metadata";
import { Constructable } from "../../utils";


export function validate(name: string) {
    return ({ constructor }: Constructable, key: string, _: PropertyDescriptor) => {
        addValidatorMethod(constructor, name, key);
    }
}

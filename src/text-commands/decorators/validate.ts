import { addTextValidatorMethod } from "../metadata";
import { Constructable } from "../../utils";


export function validate(name: string) {
    return ({ constructor }: Constructable, key: string, _: PropertyDescriptor) => {
        addTextValidatorMethod(constructor, name, key);
    }
}

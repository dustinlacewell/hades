import { addValidatorMethod } from "../meta";
import { Constructable } from "../utils";


export default function validate(name: string) {
    return ({ constructor }: Constructable, key: string, _: PropertyDescriptor) => {
        addValidatorMethod(constructor, name, key);
    }
}

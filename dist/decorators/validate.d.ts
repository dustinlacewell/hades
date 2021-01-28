import { Constructable } from "../utils";
export default function validate(name: string): ({ constructor }: Constructable, key: string, _: PropertyDescriptor) => void;

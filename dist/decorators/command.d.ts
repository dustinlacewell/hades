import { Constructor } from "../utils";
export default function command(name: string): (target: Constructor) => any;

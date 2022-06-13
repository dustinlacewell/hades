import { Parser } from "../parsers";
import { Newable } from "../../utils";


export class ParserMeta {
    type: Newable<Parser>;
    description?: string;
}
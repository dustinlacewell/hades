import { TextArgParser as TextParser } from "../parsers";
import { Newable } from "../../utils";


export class TextArgParserMeta {
    type: Newable<TextParser>;
    description?: string;
}
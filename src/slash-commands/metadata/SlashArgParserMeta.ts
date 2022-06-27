import { SlashArgParser as SlashParser } from "../parsers";
import { Newable } from "../../utils";


export class SlashArgParserMeta {
    type: Newable<SlashParser>;
    description?: string;
}
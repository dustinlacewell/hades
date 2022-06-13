import { Container } from "inversify";
import { getParserMetas } from "../metadata";
import { Parser } from "../parsers";


export const installParsers = (container: Container) => {
    const parserMetas = getParserMetas();
    for (let meta of parserMetas) {
        container.bind(Parser).to(meta.type);
        container.bind(meta.type).to(meta.type);
    }
}
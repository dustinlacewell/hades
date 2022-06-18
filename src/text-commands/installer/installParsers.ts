import { Container } from "inversify";
import { getTextParserMetas } from "../metadata";
import { TextArgParser } from "../parsers";


/**
 * Binds all @parser classes.
 * @param container HadesContainer to use.
 */
export const installParsers = (container: Container) => {
    const parserMetas = getTextParserMetas();
    for (let meta of parserMetas) {
        container.bind(TextArgParser).to(meta.type);
        container.bind(meta.type).to(meta.type);
    }
}
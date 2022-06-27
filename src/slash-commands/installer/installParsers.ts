import { Container } from "inversify";
import { getSlashParserMetas } from "../metadata/api";
import { SlashArgParser } from "../parsers/SlashArgParser";

/**
 * Binds all @parser classes.
 * @param container HadesContainer to use.
 */
export const installParsers = (container: Container) => {
    const parserMetas = getSlashParserMetas();
    for (let meta of parserMetas) {
        container.bind(SlashArgParser).to(meta.type);
        container.bind(meta.type).to(meta.type);
    }
}
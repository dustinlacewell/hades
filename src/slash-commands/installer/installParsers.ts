import { Container } from "inversify";
// import { getSlashCommandParserMetas } from "../metadata";
// import { SlashCommandArgParser } from "../parsers";


/**
 * Binds all @parser classes.
 * @param container HadesContainer to use.
 */
export const installParsers = (container: Container) => {
    // const parserMetas = getSlashCommandParserMetas();
    // for (let meta of parserMetas) {
    //     container.bind(SlashCommandArgParser).to(meta.type);
    //     container.bind(meta.type).to(meta.type);
    // }
}
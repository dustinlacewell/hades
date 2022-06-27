import { Container } from "inversify";
import { Constructable, Newable } from "../../utils";
import { SlashArgParser, StringParser } from "../parsers";

export type TypePair = readonly [Constructable, Newable<SlashArgParser>];

export const defaultMappedTypes: TypePair[] = [
    [String, StringParser],
]

/**
 * Binds which Parsers to use for what argument types, by default.
 * @param container HadesContainer to use.
 * @param mappedTypes Type mappings.
 */
export const installDefaultMappedTypes = (container: Container, mappedTypes: TypePair[]) => {
    mappedTypes.forEach(
        pair => {
            container.bind('MappedTypes').toConstantValue(pair)
        }
    );
}
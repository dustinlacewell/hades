import { Container } from "inversify";
import { Constructable, Newable } from "../../utils";
import { SlashArgParser } from "../parsers";
export declare type TypePair = readonly [Constructable, Newable<SlashArgParser>];
export declare const defaultMappedTypes: TypePair[];
/**
 * Binds which Parsers to use for what argument types, by default.
 * @param container HadesContainer to use.
 * @param mappedTypes Type mappings.
 */
export declare const installDefaultMappedTypes: (container: Container, mappedTypes: TypePair[]) => void;

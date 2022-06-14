import { Container } from "inversify";
import { Constructable, Newable } from "../../utils";
import { TextArgParser } from "../parsers";
export declare type TypePair = readonly [Constructable, Newable<TextArgParser>];
export declare const defaultMappedTypes: TypePair[];
export declare const installDefaultMappedTypes: (container: Container, mappedTypes: TypePair[]) => void;

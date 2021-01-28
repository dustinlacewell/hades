import Parser from '../parsers/Parser';
import { Newable } from '../utils';
interface ParserDecorator extends ClassDecorator, PropertyDecorator {
}
export default function parser(parserClass?: Newable<Parser>): ParserDecorator;
export {};

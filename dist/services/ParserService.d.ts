import { Collection } from 'discord.js';
import Parser from '../parsers/Parser';
import { Newable } from '../utils';
export default class ParserService {
    parsers: Collection<Newable<Parser>, Parser>;
    constructor(parsers: Parser[]);
    parserFor(parserType: Newable<Parser>): Parser;
}

import { Container } from 'inversify';
import { ArgMeta } from '../meta';
import Parser from '../parsers/Parser';
import { Constructor, Installer, Newable } from '../utils';
import CommandContext from './CommandContext';
export default class Argument {
    name: string;
    type: Constructor;
    property: string;
    description: string;
    parser: Parser;
    parserType: Newable<Parser>;
    validatorInstallers: Installer[];
    validatorMethods: any;
    constructor(meta: ArgMeta, parser: Parser);
    install(di: Container, context: CommandContext): Promise<void>;
    private throwIfValueIsEmpty;
    private parse;
    private installValidators;
    private executeValidators;
}

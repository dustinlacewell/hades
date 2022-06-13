import { Container } from 'inversify';
import { TextArgMeta } from '../metadata';
import { Parser } from '../parsers';
import { Constructor, Installer, Newable } from '../../utils';
import { TextCommandContext } from '../models/TextCommandContext';
export declare class TextArgumentInstaller {
    name: string;
    type: Constructor;
    property: string;
    description: string;
    parser: Parser;
    parserType: Newable<Parser>;
    validatorInstallers: Installer[];
    validatorMethods: any;
    constructor(meta: TextArgMeta, parser: Parser);
    install(di: Container, context: TextCommandContext): Promise<void>;
    private throwIfValueIsEmpty;
    private parse;
    private installValidators;
    private executeValidators;
}

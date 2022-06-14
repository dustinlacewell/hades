import { Container } from 'inversify';
import { TextArgMeta } from '../../metadata';
import { TextArgParser } from '../../parsers';
import { Constructor, Installer, Newable } from '../../../utils';
import { TextCommandContext } from '../../models/TextCommandContext';
export declare class TextArgInstaller {
    name: string;
    type: Constructor;
    property: string;
    description: string;
    parser: TextArgParser;
    parserType: Newable<TextArgParser>;
    validatorInstallers: Installer[];
    validatorMethods: any;
    constructor(meta: TextArgMeta, parser: TextArgParser);
    install(di: Container, context: TextCommandContext): Promise<void>;
    private throwIfValueIsEmpty;
    private parse;
    private installValidators;
    private executeValidators;
}

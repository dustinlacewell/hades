import { Container } from 'inversify';
import { TextArgMeta } from '../../metadata';
import { TextArgParser } from '../../parsers';
import { Constructor, InstallerFunc, Newable } from '../../../utils';
import { TextCommandContext } from '../../models/TextCommandContext';
/**
 * Binds argument values in a container.
 *
 * TextArgInstaller is used by the TextCommandFactory to inject the user-provided
 * value for a single command argument.
 */
export declare class TextArgInstaller {
    /** the name of the argument */
    name: string;
    /** the command class */
    type: Constructor;
    /** the property to bind to */
    property: string;
    /** the argument's description */
    description: string;
    /** the parser instance used to get the value */
    parser: TextArgParser;
    /** the parser type used to get the value */
    parserType: Newable<TextArgParser>;
    /** validator installers for this argument */
    validatorInstallers: InstallerFunc[];
    /** methods for validating this argument's value */
    validatorMethods: any;
    constructor(meta: TextArgMeta, parser: TextArgParser);
    /**
     * Install the user's value for a given argument into the container.
     * @param di A container to bind the argument value in
     * @param context The context for the command invocation
     */
    install(di: Container, context: TextCommandContext): Promise<void>;
    private throwIfValueIsEmpty;
    private parse;
    private installValidators;
    private executeValidators;
}

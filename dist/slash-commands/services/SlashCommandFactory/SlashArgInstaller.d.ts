import { Container } from 'inversify';
import { SlashArgMeta } from '../../metadata';
import { SlashArgParser } from '../../parsers';
import { Constructor, Newable } from '../../../utils';
import { SlashCommandContext } from '../../models/SlashCommandContext';
/**
 * Binds argument values in a container.
 *
 * SlashArgInstaller is used by the SlashCommandFactory to inject the user-provided
 * value for a single command argument.
 */
export declare class SlashArgInstaller {
    /** the name of the argument */
    name: string;
    /** the command class */
    type: Constructor;
    /** the property to bind to */
    property: string;
    /** the argument's description */
    description: string;
    /** the parser instance used to get the value */
    parser: SlashArgParser;
    /** the parser type used to get the value */
    parserType: Newable<SlashArgParser>;
    /** validator installers for this argument */
    /** methods for validating this argument's value */
    constructor(meta: SlashArgMeta, parser: SlashArgParser);
    /**
     * Install the user's value for a given argument into the container.
     * @param di A container to bind the argument value in
     * @param context The context for the command invocation
     */
    install(di: Container, context: SlashCommandContext): Promise<void>;
    private throwIfValueIsEmpty;
    private parse;
}

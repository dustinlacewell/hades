import { Collection } from 'discord.js';
import { Container } from 'inversify';
import { TextCommandMeta } from '../../metadata/TextCommandMeta';
import { TextArgInstaller } from './TextArgInstaller';
import { TextCommandContext } from '../../models/TextCommandContext';
import { TextArgParserResolver } from './TextArgParserResolver';
import { TextArgParserRegistry } from './TextArgParserRegistry';
/**
 * Instantiates commands on invocation.
 *
 * Ever command class is associated with its own TextCommandFactory. On
 * invocation of that command, the factory will do what's necessary to
 * create an instance of that command class suitable for execution.
 */
export declare class TextCommandFactory {
    /** container to derive sub-containers from */
    parentContainer: Container;
    /** the meta of the associated command */
    meta: TextCommandMeta;
    /** service for looking up parsers based on argument type */
    inferenceService: TextArgParserResolver;
    /** service for easy lookup of parsers */
    parserService: TextArgParserRegistry;
    /** arguments of the associated command */
    argInstallers: Collection<string, TextArgInstaller>;
    constructor(parentContainer: Container, meta: TextCommandMeta);
    /**
     * Parse and install argument values into a container.
     * @param container Container to install into.
     * @param context The command invocation context.
     */
    installArguments(container: Container, context: TextCommandContext): Promise<void>;
    /**
     * Invoke validator methods on the given command instance.
     * @param inst Command instance.
     */
    runMethodValidators(inst: any): Promise<void>;
    /**
     * Create a sub-container for resolving the command instance from.
     * @param context The parent container.
     * @returns A sub-container.
     */
    createSubContainer(context: TextCommandContext): Container;
    /**
     * Create an instance of the invoked command.
     * @param context A command invocation context.
     * @returns A command instance.
     */
    create(context: TextCommandContext): Promise<any>;
}

import { Collection } from 'discord.js';
import { Container } from 'inversify';
import { SlashCommandMeta } from '../../metadata/slashCommandMeta';
import { SlashCommandContext } from '../../models/SlashCommandContext';
import { SlashArgInstaller } from './SlashArgInstaller';
import { SlashArgParserRegistry } from './SlashArgParserRegistry';
import { SlashArgParserResolver } from './SlashArgParserResolver';
/**
 * Instantiates commands on invocation.
 *
 * Every command class is associated with its own SlashCommandFactory. On
 * invocation of that command, the factory will do what's necessary to
 * create an instance of that command class suitable for execution.
 */
export declare class SlashCommandFactory {
    /** container to derive sub-containers from */
    parentContainer: Container;
    /** the meta of the associated command */
    meta: SlashCommandMeta;
    /** service for looking up parsers based on argument type */
    inferenceService: SlashArgParserResolver;
    /** service for easy lookup of parsers */
    parserService: SlashArgParserRegistry;
    /** arguments of the associated command */
    argInstallers: Collection<string, SlashArgInstaller>;
    constructor(parentContainer: Container, meta: SlashCommandMeta);
    /**
     * Parse and install argument values into a container.
     * @param container Container to install into.
     * @param context The command invocation context.
     */
    installArguments(container: Container, context: SlashCommandContext): Promise<void>;
    /**
     * Invoke validator methods on the given command instance.
     * @param inst Command instance.
     */
    /**
     * Create a sub-container for resolving the command instance from.
     * @param context The parent container.
     * @returns A sub-container.
     */
    createSubContainer(context: SlashCommandContext): Container;
    /**
     * Create an instance of the invoked command.
     * @param context A command invocation context.
     * @returns A command instance.
     */
    create(context: SlashCommandContext): Promise<any>;
}

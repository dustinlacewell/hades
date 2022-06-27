import { Collection } from 'discord.js';
import { SlashCommandFactory } from './SlashCommandFactory';
/**
 * A registry of available command factories.
 */
export declare class SlashCommandFactoryRegistry {
    map: Collection<string, SlashCommandFactory>;
    factories: SlashCommandFactory[];
    init(): void;
    factoryFor(name: string): SlashCommandFactory;
    find(predicate: (factory: SlashCommandFactory) => boolean): SlashCommandFactory;
    all(): SlashCommandFactory[];
}

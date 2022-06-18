import { Collection } from 'discord.js';
import { TextCommandFactory } from './TextCommandFactory';
/**
 * A registry of available command factories.
 */
export declare class TextCommandFactoryRegistry {
    map: Collection<string, TextCommandFactory>;
    factories: TextCommandFactory[];
    init(): void;
    factoryFor(name: string): TextCommandFactory;
    find(predicate: (factory: TextCommandFactory) => boolean): TextCommandFactory;
    all(): TextCommandFactory[];
}

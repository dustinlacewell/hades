import { Collection } from 'discord.js';
import { TextCommandHelper } from './TextCommandHelper';
/**
 * A registry of available command helpers.
 */
export declare class TextCommandHelperRegistry {
    map: Collection<string, TextCommandHelper>;
    helpers: TextCommandHelper[];
    init(): void;
    helperFor(name: string): TextCommandHelper;
    find(predicate: (helper: TextCommandHelper) => boolean): TextCommandHelper;
}

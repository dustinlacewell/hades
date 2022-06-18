import { Collection } from 'discord.js';
import { multiInject, postConstruct } from 'inversify';

import { singleton } from '../../../decorators/singleton';
import { TextCommandFactory } from './TextCommandFactory';


/**
 * A registry of available command factories.
 */
@singleton(TextCommandFactoryRegistry)
export class TextCommandFactoryRegistry {
    map = new Collection<string, TextCommandFactory>();

    @multiInject(TextCommandFactory)
    factories: TextCommandFactory[]

    @postConstruct()
    init() {
        for (const factory of this.factories) {
            this.map.set(factory.meta.name, factory);
        }
    }

    factoryFor(name: string) {
        return this.map.get(name);
    }

    find(predicate: (factory: TextCommandFactory) => boolean) {
        return this.factories.find(predicate)
    }

    all() {
        return this.factories;
    }
}

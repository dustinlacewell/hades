import { fluentProvide } from "inversify-binding-decorators";


/**
 * Binds a decorated class as a singleton.
 * @param identifier Identifier token to bind to.
 */
export function singleton(identifier: any) {
    return fluentProvide(identifier)
        .inSingletonScope()
        .done();
};

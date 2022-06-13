import { fluentProvide } from "inversify-binding-decorators";


export function singleton(identifier: any) {
    return fluentProvide(identifier)
        .inSingletonScope()
        .done();
};

import { fluentProvide } from "inversify-binding-decorators";


export default function singleton(identifier: any) {
    return fluentProvide(identifier)
        .inSingletonScope()
        .done();
};

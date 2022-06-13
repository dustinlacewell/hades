import { Container } from "inversify";
import { TextCommandFactory } from "../factories/TextCommandFactory";
import { getCommandMetas } from "../metadata";


export const installCommandFactories = (container: Container) => {
    const commandMetas = getCommandMetas();
    for (let meta of commandMetas.values()) {
        const factory = new TextCommandFactory(container, meta);
        container
            .bind<TextCommandFactory>(TextCommandFactory)
            .toConstantValue(factory);
    }
}
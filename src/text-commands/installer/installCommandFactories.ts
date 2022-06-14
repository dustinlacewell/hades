import { Container } from "inversify";
import { TextCommandFactory } from "../services/TextCommandFactory/TextCommandFactory";
import { getTextCommandMetas } from "../metadata";


export const installCommandFactories = (container: Container) => {
    const commandMetas = getTextCommandMetas();
    for (let meta of commandMetas.values()) {
        const factory = new TextCommandFactory(container, meta);
        container
            .bind<TextCommandFactory>(TextCommandFactory)
            .toConstantValue(factory);
    }
}
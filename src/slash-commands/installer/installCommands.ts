import { Container } from "inversify"
import { getSlashCommandMetas } from "../metadata/api";
import { SlashCommandMeta } from "../metadata/slashCommandMeta";
import { SlashCommandFactory } from "../services/SlashCommandFactory/SlashCommandFactory";

type Metas = ReturnType<typeof getSlashCommandMetas>

const installCommandFactory = (container: Container, meta: SlashCommandMeta) => {
    const factory = new SlashCommandFactory(container, meta);
    container
        .bind<SlashCommandFactory>(SlashCommandFactory)
        .toConstantValue(factory);
}

const installCommandFactories = (container: Container, metas: Metas) => {
    metas.forEach(meta => installCommandFactory(container, meta))
}

/**
 * Binds SlashCommandFactory instances for each @command
 * @param container The HadesContainer to use.
 */
 export const installCommands = (container: Container) => {
  const metas = getSlashCommandMetas()
  installCommandFactories(container, metas)
  // installCommandHelpers(container, metas)
}
import { Container } from "inversify";
/**
 * Binds SlashCommandFactory instances for each @command
 * @param container The HadesContainer to use.
 */
export declare const installCommands: (container: Container) => void;

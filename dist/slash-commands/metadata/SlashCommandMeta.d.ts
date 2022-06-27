import { Collection } from "discord.js";
import { Constructor } from "../../utils";
import { SlashArgMeta } from "./SlashArgMeta";
/**
 * Decorator metadata for @command
 */
export declare class SlashCommandMeta {
    name: string;
    target: Constructor;
    args: Collection<string, SlashArgMeta>;
    description?: string;
    getArgMeta(name: string): SlashArgMeta;
}

import { Collection } from "discord.js";
import { Constructor } from "../../utils";
import { SlashArgMeta } from "./SlashArgMeta";
export declare type SlashCommandRegistrationDetails = {
    name: string;
    description: string;
    type: string;
};
/**
 * Decorator metadata for @command
 */
export declare class SlashCommandMeta {
    name: string;
    target: Constructor;
    args: Collection<string, SlashArgMeta>;
    description?: string;
    registrationDetails?: SlashCommandRegistrationDetails;
    getArgMeta(name: string): SlashArgMeta;
}

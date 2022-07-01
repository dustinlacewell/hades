import { SlashCommandRegistrationDetails } from "../metadata";
/**
 * Registers discord slash command details
 * @param name The command's discord registration options.
 */
export declare function register(registrationDetails: SlashCommandRegistrationDetails): (target: any) => void;

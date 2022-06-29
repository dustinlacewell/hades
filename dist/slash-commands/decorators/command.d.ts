import { SlashCommandRegistrationDetails } from "../metadata";
/**
 * Marks a SlashCommand class as a command.
 * @param name The command's name.
 */
export declare function command(name: string, registrationDetails: SlashCommandRegistrationDetails): (target: any) => any;

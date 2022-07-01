import {
  getSlashCommandMeta,
  SlashCommandRegistrationDetails,
} from "../metadata";

/**
 * Registers discord slash command details
 * @param name The command's discord registration options.
 */
export function register(registrationDetails: SlashCommandRegistrationDetails) {
  return (target: any) => {
    const meta = getSlashCommandMeta(target);
    meta.registrationDetails = registrationDetails;
  };
}

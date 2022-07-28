import { injectable } from "inversify";

import {
  getSlashCommandMeta,
  SlashCommandRegistrationDetails,
} from "../metadata";
/**
 * Marks a SlashCommand class as a command.
 * @param name The command's name.
 */
export function command(
  name: string,
  registrationDetails: SlashCommandRegistrationDetails
) {
  return (target: any) => {
    const meta = getSlashCommandMeta(target);
    meta.name = name;
    meta.registrationDetails = registrationDetails;
    meta.target = target;
    return injectable()(target);
  };
}

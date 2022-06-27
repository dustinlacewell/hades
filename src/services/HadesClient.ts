import { GatewayIntentBits } from "discord-api-types/v10";
import { Client, Collection } from "discord.js";
import { postConstruct } from "inversify";

import { singleton } from "../decorators";

declare module "discord.js" {
  export interface Client {
      commands?: Collection<unknown, any>
  }
}
/**
 * The base Discord client class.
 */
@singleton(HadesClient)
export class HadesClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
            ]
        })
    }
}

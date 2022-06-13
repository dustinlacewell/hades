import { GatewayIntentBits } from "discord-api-types/v10";
import { Client } from "discord.js";

import { singleton } from "../decorators";


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

import { Client, Collection } from "discord.js";
declare module "discord.js" {
    interface Client {
        commands?: Collection<unknown, any>;
    }
}
/**
 * The base Discord client class.
 */
export declare class HadesClient extends Client {
    constructor();
}

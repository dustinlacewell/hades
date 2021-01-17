import { Client } from "discord.js";
import { singleton } from "../decorators";


@singleton(HadesClient)
export default class HadesClient extends Client { }

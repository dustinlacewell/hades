import { Client } from "discord.js";

import singleton from "../decorators/singleton";


@singleton(HadesClient)
export default class HadesClient extends Client { }

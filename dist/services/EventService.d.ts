import HadesBotService from "./HadesBotService";
import HadesClient from "./HadesClient";
export default abstract class EventService {
    client: HadesClient;
    constructor(client: HadesClient);
    register(bot: HadesBotService): void;
}

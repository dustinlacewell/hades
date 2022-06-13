import { HadesBotService } from './HadesBotService';
import { HadesClient } from './HadesClient';
export declare abstract class EventService {
    client: HadesClient;
    constructor(client: HadesClient);
    register(bot: HadesBotService): void;
}

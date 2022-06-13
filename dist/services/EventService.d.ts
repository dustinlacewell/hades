import { HadesBotService } from '../text-commands/services/HadesBotService';
import { HadesClient } from './HadesClient';
export declare abstract class EventService {
    client: HadesClient;
    constructor(client: HadesClient);
    register(bot: HadesBotService): void;
}

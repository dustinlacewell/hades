import { HadesBotService } from './HadesBotService';
import { HadesClient } from './HadesClient';
/**
 * A callback service for Discord events.
 */
export declare abstract class EventService {
    client: HadesClient;
    /**
     * Register a bot for event callbacks.
     * @param bot The bot to register callbacks for.
     */
    register(bot: HadesBotService): void;
}
//# sourceMappingURL=EventService.d.ts.map
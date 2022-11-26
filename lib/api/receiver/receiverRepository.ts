import { AppDataSource } from "../database/datasource";
import { Receiver } from "../database/entities/receiver";

export const ReceiverRepository = AppDataSource.getRepository(Receiver).extend({
    
});
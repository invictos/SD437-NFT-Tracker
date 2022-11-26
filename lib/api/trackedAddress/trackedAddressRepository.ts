import { AppDataSource } from "../database/datasource";
import { TrackedAddress } from "../database/entities/trackedAddress";

export const TrackedAddressRepository = AppDataSource.getRepository(TrackedAddress).extend({

});
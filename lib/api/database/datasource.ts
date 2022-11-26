import "reflect-metadata";
import { DataSource } from "typeorm";
import { Receiver } from "./entities/receiver";
import { TrackedAddress } from "./entities/trackedAddress";
import { loadDBInfo } from "./loadDBInfo";

const entities = [
    TrackedAddress,
    Receiver,
];

const databaseInfo = loadDBInfo();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: databaseInfo.host,
    port: databaseInfo.port,
    username: databaseInfo.username,
    password: databaseInfo.password,
    database: databaseInfo.database,
    entities: entities,
    synchronize: true,
    logging: true,
})


let initializedDB = false;
export async function initializeDatabase(){
    if (initializedDB) {
        return;
    }
    try {
        await AppDataSource.initialize()
    }catch(e){
        console.warn('Database init error: ', e);
        throw e;
    }
    initializedDB = true;
    return;
}
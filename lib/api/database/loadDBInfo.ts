export type DBInfo = {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export function loadDBInfo(): DBInfo {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_DATABASE;

    if (!host || !port || !username || !password || !database) {
        throw new Error("Missing database info");
    }

    return {
        host,
        port: parseInt(port),
        username,
        password,
        database,
    };
}

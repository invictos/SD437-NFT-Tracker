import { initializeDatabase } from "lib/api/database/datasource";
import { ScannerService } from "lib/api/scanner/scannerService";
import { NextApiRequest, NextApiResponse } from "next";
import { APIResponse } from "types/general";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<APIResponse<any>>
) {

    if(req.method !== 'GET'){
        res.status(405).json({message: 'Method not allowed'});
        return;
    }
    
    await initializeDatabase();

    const scanner = new ScannerService();

    const transactions = await scanner.scan();

    return res.status(200).json(transactions);
}
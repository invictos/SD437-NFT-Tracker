import { initializeDatabase } from "lib/api/database/datasource";
import { TrackedAddress } from "lib/api/database/entities/trackedAddress";
import { TrackedAddressService } from "lib/api/trackedAddress/trackedAddressService";
import { NextApiRequest, NextApiResponse } from "next";
import { APIResponse } from "types/general";
import { ReceiverType } from "types/notification";

export type TrackedAdressRequest = {
    address: string;
    receiverType: ReceiverType;
    receiverPayload: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<APIResponse<TrackedAddress>>
) {

    if(req.method !== 'POST'){
        res.status(405).json({message: 'Method not allowed'});
        return;
    }
    const body = validateBody(req.body);
    
    await initializeDatabase();

    const taService = new TrackedAddressService();

    const ta = await taService.create(body.address, body.receiverType, body.receiverPayload);

    res.status(200).json(ta);
}

function validateBody(body: any): TrackedAdressRequest{
    if(!body.address){
        throw new Error('Missing address');
    }
    if(!body.receiverType || !['EMAIL', 'SMS'].includes(body.receiverType)){
        throw new Error('Missing receiverType');
    }
    if(!body.receiverPayload){
        throw new Error('Missing receiverPayload');
    }
    return body as TrackedAdressRequest;
}
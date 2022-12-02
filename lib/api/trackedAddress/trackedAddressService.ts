import { UUID } from "types/general";
import { ReceiverType } from "../../../types/notification";
import { TrackedAddress } from "../database/entities/trackedAddress";
import { ReceiverService } from "../receiver/receiverService";
import { TrackedAddressRepository } from "./trackedAddressRepository";

const addressRegex = /^0x[a-fA-F0-9]{40}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // eslint-disable-line no-useless-escape
const telRegex = /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/;

export class TrackedAddressService {
    repository;
    receiverService;

    constructor(){
        this.repository = TrackedAddressRepository;
        this.receiverService = new ReceiverService();
    }

    async create(address: string, receiverType: ReceiverType, receiverPayload: string){
        validatePayload(receiverType, receiverPayload);
        validateAddress(address);
        
        const receiver = await this.receiverService.create(receiverType, receiverPayload);

        const trackedAddress = new TrackedAddress(address);
        trackedAddress.receivers = [receiver];
        trackedAddress.lastTimeStamp = Math.round(new Date().getTime()/1000);

        await this.repository.save(trackedAddress);

        return trackedAddress;
    }

    async getAll(){
        return await this.repository.find();
    }

    async updateLastTimeStamp(id: UUID, lastTimeStamp: number){
        const trackedAddress = await this.repository.findOneBy({
            id: id 
        });

        if(!trackedAddress){
            throw new Error('Tracked address not found');
        }

        trackedAddress.lastTimeStamp = lastTimeStamp;

        await this.repository.save(trackedAddress);

        return trackedAddress; 
    }

}

function validatePayload(receiverType: ReceiverType, receiverPayload: string) {
    if(!receiverType || !['EMAIL', 'SMS'].includes(receiverType)){
        throw new Error('Missing receiverType');
    }
    if(!receiverPayload){
        throw new Error('Missing receiverPayload');
    }
    if(receiverType === 'EMAIL' && !receiverPayload.match(emailRegex)){
        throw new Error('Invalid email');
    }
    if(receiverType === 'SMS' && !receiverPayload.match(telRegex)){
        throw new Error('Invalid phone number');
    }
}
function validateAddress(address: string) {
    if(!address || !address.match(addressRegex)){
        throw new Error('Invalid address');
    }
}

export const test_validatePayload = validatePayload;
export const test_validateAddress = validateAddress;
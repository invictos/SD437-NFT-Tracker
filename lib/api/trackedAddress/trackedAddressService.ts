import { UUID } from "types/general";
import { validateHash } from "../../../types/etherum";
import { ReceiverType } from "../../../types/notification";
import { TrackedAddress } from "../database/entities/trackedAddress";
import { ReceiverService } from "../receiver/receiverService";
import { TrackedAddressRepository } from "./trackedAddressRepository";

export class TrackedAddressService {
    repository;
    receiverService;

    constructor(){
        this.repository = TrackedAddressRepository;
        this.receiverService = new ReceiverService();
    }

    async create(address: string, receiverType: ReceiverType, receiverPayload: string){
        const receiver = await this.receiverService.create(receiverType, receiverPayload);

        const hash = validateHash(address);

        const trackedAddress = new TrackedAddress(hash);

        trackedAddress.receivers = [receiver];

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
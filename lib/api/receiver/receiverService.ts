import { ReceiverType } from "../../../types/notification";
import { Receiver } from "../database/entities/receiver";
import { ReceiverRepository } from "./receiverRepository";

export class ReceiverService {
    repository;

    constructor(){
        this.repository = ReceiverRepository;
    }

    async create(type: ReceiverType, payload: string){
        const receiver = new Receiver(type, payload);
        await this.repository.save(receiver);
        return receiver;
    }

}
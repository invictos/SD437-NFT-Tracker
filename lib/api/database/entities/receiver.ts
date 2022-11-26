import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { UUID } from "types/general";
import { ReceiverType } from "../../../../types/notification";
import { TrackedAddress } from "./trackedAddress";

@Entity()
export class Receiver {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column({
        type: "enum",
        enum: ReceiverType
    })
    receiverType: ReceiverType;

    @Column()
    payload: string;

    @ManyToOne(() => TrackedAddress, (address) => address.receivers)
    trackedAdress: TrackedAddress;

    constructor(type: ReceiverType, payload: string) {
        this.receiverType = type;
        this.payload = payload;
    }
}
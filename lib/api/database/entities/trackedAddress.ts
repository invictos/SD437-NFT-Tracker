import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import type { UUID } from "types/general";
import { Receiver } from "./receiver";

@Entity()
export class TrackedAddress {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column()
    address: string;

    @OneToMany(() => Receiver, (receiver) => receiver.trackedAdress, {eager: true})
    receivers: Receiver[];

    @Column()
    lastTimeStamp: number;

    constructor(address: string) {
        this.address = address;
        this.lastTimeStamp = 0;
    }
}
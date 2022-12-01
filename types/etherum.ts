import { UUID } from "./general";

export interface Contract {
    contractAddress: string
}

export interface NFT {
    contract: Contract
    tokenId: number
}

export interface TrackingEvent {
    id: UUID
    date: Date;
    transaction: string;
    from: string;
    to: string;
    nft: NFT;
}
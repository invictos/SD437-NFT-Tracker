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

export function validateHash(hash: string): string {
    if(!hash.startsWith('0x')){
        throw new Error('Hash must start with 0x');
    }
    return hash as string;
}
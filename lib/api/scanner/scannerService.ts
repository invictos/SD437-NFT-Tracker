import { NotificationRequest } from "types/notification";
import { TrackedAddress } from "../database/entities/trackedAddress";
import { EtherscanService, Transaction } from "../etherscan/etherscanService";
import { NotificationService } from "../notification/NotificationService";
import { throttledPromises } from "../throttle";
import { TrackedAddressService } from "../trackedAddress/trackedAddressService";
import { randomUUID } from "../uuid";

export class ScannerService {
    private readonly etherscanService: EtherscanService;
    private readonly trackedAddressService: TrackedAddressService;
    private readonly notificationService: NotificationService;

    constructor() {
        this.etherscanService = new EtherscanService();
        this.trackedAddressService = new TrackedAddressService();
        this.notificationService = new NotificationService();
    }

    async scan() {
        const trackedAddresses = await this.trackedAddressService.getAll();
        
        const results = await throttledPromises(this.processOne.bind(this), trackedAddresses, 5, 1050);
        
        return results.reduce((a: number, b: number) => a + b, 0);
    }

    async processOne(trackedAddress: TrackedAddress){
        const transactions = await this.etherscanService.getTransactions(trackedAddress.address);
        let count = 0;
        for (const transaction of transactions) {
            if (transaction.timeStamp > trackedAddress.lastTimeStamp) {
                await this.notificationService.sendNotification(createNotification(trackedAddress, transaction));
                count++;
            }
        }
        trackedAddress.lastTimeStamp = Math.max(...transactions.map(t => t.timeStamp));
        await this.trackedAddressService.updateLastTimeStamp(trackedAddress.id, trackedAddress.lastTimeStamp);
        return count;
    }
}


function createNotification(address: TrackedAddress, transaction: Transaction): NotificationRequest{
    return {
        id: randomUUID(),
        date: new Date(transaction.timeStamp * 1000),
        receivers: address.receivers,
        event: {
            id: randomUUID(),
            date: new Date(transaction.timeStamp * 1000),
            transaction: transaction.hash,
            from: transaction.from,
            to: transaction.to,
            nft: {
                contract: {
                    contractAddress: transaction.contractAddress,
                },
                tokenId: transaction.tokenId,
            }
        }
    }
}

export const test_createNotification = createNotification;
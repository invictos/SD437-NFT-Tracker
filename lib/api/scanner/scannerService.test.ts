import { ReceiverType } from "types/notification";
import { TrackedAddress } from "../database/entities/trackedAddress";
import { Transaction } from "../etherscan/etherscanService";
import { test_createNotification } from "./scannerService";
import { expect } from '@jest/globals';

test('ScannerService createNotification', () => {
    const address: TrackedAddress = {
        id: '00000000-0000-0000-0000-000000000000',
        address: '0x123',
        lastTimeStamp: 0,
        receivers: [
            {
                id: '00000000-0000-0000-0000-000000000001',
                receiverType: ReceiverType.EMAIL,
                payload: '+10123456789',
                trackedAdress: null as unknown as TrackedAddress
            }
        ]
    }

    const transaction: Transaction = {
        timeStamp: 123,
        hash: '0x1231',
        from: '0x123',
        to: '0x1233',
        contractAddress: '0x1234',
        tokenId: 123,
        blockNumber: '1235',
        tokenName: '0x1236',
    };

    const notification = test_createNotification(address, transaction);

    expect(notification.id).toBeDefined();
    expect(notification.date).toBeInstanceOf(Date);
    expect(notification.receivers).toHaveLength(1);
    expect(notification.receivers[0].id).toBe('00000000-0000-0000-0000-000000000001');
    expect(notification.receivers[0].receiverType).toBe(ReceiverType.EMAIL);
    expect(notification.receivers[0].payload).toBe('+10123456789');
    expect(notification.event).toBeDefined();
    expect(notification.event.id).toBeDefined();
    expect(notification.event.date).toBeInstanceOf(Date);
    expect(notification.event.transaction).toBe('0x1231');
    expect(notification.event.from).toBe('0x123');
    expect(notification.event.to).toBe('0x1233');
    expect(notification.event.nft).toBeDefined();
    expect(notification.event.nft.contract).toBeDefined();
    expect(notification.event.nft.contract.contractAddress).toBe('0x1234');
    expect(notification.event.nft.tokenId).toBe(123);
});
import { NotificationHandler, NotificationRequest } from "types/notification";

const dotenv = require('dotenv').config()
const twilio = require('twilio');

const client = new twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

export class NotificationService implements NotificationHandler{
    async sendNotification(notification: NotificationRequest): Promise<void> {
        client.messages
        .create({
            body: `NFT at address ${notification.event.nft.contract.contractAddress} and token ${notification.event.nft.tokenId} was transfered from ${notification.event.from} to ${notification.event.to}`,
            to: notification.event.from,
            from: notification.event.to
        })
        .then(() => {
            console.log('Message sent succesfully.')
        }).catch((error: Error) => {
            console.error(error);
        });

        console.log('NOTIFICATION: ', notification);
        console.log(JSON.stringify(notification));
    }
}
import Twilio from "twilio";
import { NotificationHandler, NotificationRequest } from "types/notification";


export class NotificationService implements NotificationHandler{
    twilioClient: Twilio.Twilio;

    constructor() {
        this.twilioClient = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async sendNotification(notification: NotificationRequest): Promise<void> {
        this.twilioClient.messages
        .create({
            body: `NFT at address ${notification.event.nft.contract.contractAddress} and token ${notification.event.nft.tokenId} was transfered from ${notification.event.from} to ${notification.event.to}`,
            to: notification.receivers[0].payload,
            from: process.env.TWILIO_FROM_PHONE_NUMBER
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
import sgMail from '@sendgrid/mail';
import Twilio from "twilio";
import { NotificationHandler, NotificationRequest } from "types/notification";


export class NotificationService implements NotificationHandler{
    twilioClient: Twilio.Twilio;
    sgMail: typeof sgMail;

    constructor() {
        if(!process.env.SENDGRID_API_KEY || !process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN){
            throw new Error('Missing environment variables');
        }
        this.twilioClient = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        this.sgMail = sgMail;
        this.sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async sendNotification(notification: NotificationRequest): Promise<void> {
        if (notification.receivers[0].receiverType === 'EMAIL') {
            await this.sendEmail(notification);
        } else {
            await this.sendSMS(notification);
        }
    }

    async sendSMS(notification: NotificationRequest): Promise<void> {
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
    }

    async sendEmail(notification: NotificationRequest): Promise<void> {
        this.sgMail
        .send({
            to: notification.receivers[0].payload,
            from: 'nftaddresstracker@gmail.com',
            subject: 'Alert: New NFT transfer',
            text: `NFT at address ${notification.event.nft.contract.contractAddress} and token ${notification.event.nft.tokenId} was transfered from ${notification.event.from} to ${notification.event.to}`,
            html: `NFT at address ${notification.event.nft.contract.contractAddress} and token ${notification.event.nft.tokenId} was transfered from ${notification.event.from} to ${notification.event.to}`,
        })
        .then(() => {
            console.log('Email sent succesfully.');
        }, error => {
            console.log(error);
            if (error.response) {
                console.error(error.response.body)
            }
        })
    }

}
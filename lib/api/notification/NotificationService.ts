import { NotificationHandler, NotificationRequest } from "types/notification";

export class NotificationService implements NotificationHandler{
    async sendNotification(notification: NotificationRequest): Promise<void> {
        console.log('NOTIFICATION: ', notification);
        console.log(JSON.stringify(notification));
    }
}
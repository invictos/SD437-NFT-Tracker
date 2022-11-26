import { NotificationRequest } from "types/notification";

export interface NotificationHandler {
    sendNotification(notification: NotificationRequest): Promise<void>;
}
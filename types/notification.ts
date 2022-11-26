import { TrackingEvent } from "./etherum";
import { UUID } from "./general";

export enum ReceiverType {
    EMAIL = "EMAIL",
    SMS = "SMS",
}

export interface Receiver {
    id: UUID,
    receiverType: ReceiverType,
    payload: string
}

export interface NotificationRequest{
    id: UUID,
    date: Date,
    receivers: Receiver[],
    event: TrackingEvent
}

export interface NotificationHandler {
    sendNotification(notification: NotificationRequest): Promise<void>;
}
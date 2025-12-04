import { DeliveryStatus } from "../types/delivery-status.type";

export interface Delivery {
    id: string;
    createdAt: string;
    originCity: string;
    destinationCity: string;
    distanceKm: number;
    weightKg: number;
    serviceType:DeliveryStatus;
    fragile: boolean;
    status: DeliveryStatus;
    basePrice: number;
    fragileFee: number;
    expressFee: number;
    totalPrice: number;
}
import { DeliveryStatus } from "src/core/domain/types/delivery-status.type";

export class CreateDeliveryPresentationRequest {
    originCity: string;
    destinationCity: string;
    distanceKm: number;
    weightKg: number;
    serviceType: DeliveryStatus;
    fragile: boolean;
}
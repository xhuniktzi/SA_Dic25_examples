import { DeliveryStatus } from "src/core/domain/types/delivery-status.type";

export class CreateDeliveryUseCaseRequest {
    originCity: string;
    destinationCity: string;
    distanceKm: number;
    weightKg: number;
    serviceType: DeliveryStatus;
    fragile: boolean;
}
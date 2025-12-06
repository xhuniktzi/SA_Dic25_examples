import { ApiProperty } from "@nestjs/swagger";
import type { DeliveryStatus } from "src/core/domain/types/delivery-status.type";

export class CreateDeliveryPresentationRequest {
    @ApiProperty({ example: "New York", type: String })
    originCity: string;
    @ApiProperty({ example: "Los Angeles" })
    destinationCity: string;
    @ApiProperty({ example: 4500 })
    distanceKm: number;
    @ApiProperty({ example: 5.5 })
    weightKg: number;
    @ApiProperty({ example: "STANDARD", type: String, enum: ['ACTIVE', 'CANCELLED', 'EXPRESS', 'STANDARD'] })
    serviceType: DeliveryStatus;
    @ApiProperty({ example: false })
    fragile: boolean;
}
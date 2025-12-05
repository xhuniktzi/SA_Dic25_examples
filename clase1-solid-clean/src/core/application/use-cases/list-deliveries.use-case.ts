import { Injectable } from "@nestjs/common";
import { StorageContract } from "src/core/domain/contracts/storage.contract";
import { Delivery } from "src/core/domain/interfaces/delivery.interface";

@Injectable()
export class ListDeliveriesUseCase {
    constructor(private readonly _deliveries: StorageContract) {}

    execute(): Delivery[] {
        return this._deliveries.listDeliveries();
    }
}
import { Injectable } from "@nestjs/common";
import { StorageContract } from "src/core/domain/contracts/storage.contract";
import { NotFoundError } from "src/core/domain/errors/not-found.error";

@Injectable()
export class FindByIdUseCase {
    constructor(private readonly _storage: StorageContract) { }

    async execute(id: string) {
        const delivery = await  this._storage.findDeliveryById(id);
        if (!delivery) {
            throw new NotFoundError('Delivery not found');
        }

        return {
            ...delivery,
            label: `${delivery.originCity} -> ${delivery.destinationCity} [${delivery.status}]`,
        };
    }
}
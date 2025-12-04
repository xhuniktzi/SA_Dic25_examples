import { Injectable } from "src/shared/di/injectable";
import { StorageContract } from "src/core/domain/contracts/storage.contract";
import { InvalidRequestError } from "src/core/domain/errors/invalid-request.error";
import { NotFoundError } from "src/core/domain/errors/not-found.error";


@Injectable()
export class CancelDeliveryUseCase {
    constructor(private readonly _storage: StorageContract) { }
    

    execute(id: string) {
        // Lógica de “use case” también acá dentro
        const delivery = this._storage.findDeliveryById(id);
        if (!delivery) {
            throw new NotFoundError('Delivery not found');
        }

        if (delivery.status === 'CANCELLED') {
            // Código de error inventado, sin consistencia con otros transports
            throw new InvalidRequestError('Delivery already cancelled');
        }

        // Cambiar estado y devolver algo
        delivery.status = 'CANCELLED';

        this._storage.updateDelivery(delivery);

        return {
            id: delivery.id,
            status: delivery.status,
            totalPrice: delivery.totalPrice, // el total queda “congelado”
            cancelledAt: new Date().toISOString(), // se mezcla lógica temporal acá también
        };
    }
}
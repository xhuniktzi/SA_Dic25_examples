import { Injectable } from "@nestjs/common";
import { StorageContract } from "../../domain/contracts/storage.contract";
import { InvalidRequestError } from "../../domain/errors/invalid-request.error";
import { NotFoundError } from "../../domain/errors/not-found.error";


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
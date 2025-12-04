import { Delivery } from "../interfaces/delivery.interface";

export abstract class StorageContract {
    public abstract saveDelivery(delivery: Delivery): void;
    public abstract listDeliveries(): Delivery[];
    public abstract findDeliveryById(id: string): Delivery | null;
    public abstract updateDelivery(delivery: Delivery): void;
}
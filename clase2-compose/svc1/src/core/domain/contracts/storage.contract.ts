import { Delivery } from "../interfaces/delivery.interface";

export abstract class StorageContract {
    public abstract saveDelivery(delivery: Delivery): Promise<void>;
    public abstract listDeliveries(): Promise<Delivery[]>;
    public abstract findDeliveryById(id: string): Promise<Delivery | null>;
    public abstract updateDelivery(delivery: Delivery): Promise<void>;
}
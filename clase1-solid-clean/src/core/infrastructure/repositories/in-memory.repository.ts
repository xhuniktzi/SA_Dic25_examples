import { StorageContract } from "src/core/domain/contracts/storage.contract";
import { Delivery } from "../../domain/interfaces/delivery.interface";

export class InMemoryRepository implements StorageContract {
    private deliveries: Delivery[] = [];

    public saveDelivery(delivery: Delivery): void {
        this.deliveries.push(delivery);
    }

    public listDeliveries(): Delivery[] {
        return this.deliveries;
    }

    public findDeliveryById(id: string): Delivery | null {
        const delivery = this.deliveries.find((d) => d.id === id);
        return delivery || null;
    }

    public updateDelivery(delivery: Delivery): void {
        const index = this.deliveries.findIndex((d) => d.id === delivery.id);
        if (index !== -1) {
            this.deliveries[index] = delivery;
        }
    }


}
import { Inject, Injectable } from "@nestjs/common";
import { Redis } from "ioredis";
import { Delivery } from "../../domain/interfaces/delivery.interface";
import { StorageContract } from "../../domain/contracts/storage.contract";

const DELIVERIES_HASH = "deliveries";

@Injectable()
export class RedisStorageRepository extends StorageContract {
    constructor(@Inject("REDIS_CLIENT") private readonly redis: Redis) {
        super();
    }

    public async saveDelivery(delivery: Delivery): Promise<void> {
        await this.redis.hset(DELIVERIES_HASH, delivery.id, JSON.stringify(delivery));
    }

    public async listDeliveries(): Promise<Delivery[]> {
        const payloads = await this.redis.hvals(DELIVERIES_HASH);
        return payloads.map((payload) => JSON.parse(payload) as unknown as Delivery);
    }

    public async findDeliveryById(id: string): Promise<Delivery | null> {
        const payload = await this.redis.hget(DELIVERIES_HASH, id);
        return payload ? (JSON.parse(payload) as Delivery) : null;
    }

    public async updateDelivery(delivery: Delivery): Promise<void> {
        await this.saveDelivery(delivery);
    }
}
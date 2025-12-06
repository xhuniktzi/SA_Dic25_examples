import { Module } from "@nestjs/common";
import { DeliveriesRestController } from "../presentation/deliveries.controller.rest";
import { StorageContract } from "../domain/contracts/storage.contract";
import { CreateDeliveryUseCase } from "../application/use-cases/create-delivery.use-case";
import { ListDeliveriesUseCase } from "../application/use-cases/list-deliveries.use-case";
import { FindByIdUseCase } from "../application/use-cases/find-by-id.use-case";
import { CancelDeliveryUseCase } from "../application/use-cases/cancel-delivery.use-case";
import { RedisStorageRepository } from "./repositories/redis.repository";
import { RedisModule } from "./redis.module";

@Module({
    imports: [RedisModule],
    controllers: [DeliveriesRestController],
    providers: [
        CreateDeliveryUseCase,
        ListDeliveriesUseCase,
        FindByIdUseCase,
        CancelDeliveryUseCase,
        {
        provide: StorageContract,
        useClass: RedisStorageRepository,
    },
],
    
    exports: [StorageContract]
})
export class DeliveryModule {
}
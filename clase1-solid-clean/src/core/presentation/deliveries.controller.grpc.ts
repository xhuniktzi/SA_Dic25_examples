import {
    Controller,
    Param,
} from '@nestjs/common';
import { CreateDeliveryPresentationRequest } from './dto/create-delivery.dto';
import { CreateDeliveryUseCase } from '../application/use-cases/create-delivery.use-case';
import { ListDeliveriesUseCase } from '../application/use-cases/list-deliveries.use-case';
import { FindByIdUseCase } from '../application/use-cases/find-by-id.use-case';
import { CancelDeliveryUseCase } from '../application/use-cases/cancel-delivery.use-case';
import { GrpcMethod } from '@nestjs/microservices';
import { Delivery } from '../domain/interfaces/delivery.interface';

@Controller()
export class DeliveriesGrpcController {

    constructor(private readonly _createDeliveryUseCase: CreateDeliveryUseCase,
        private readonly _listDeliveriesUseCase: ListDeliveriesUseCase,
        private readonly _findByIdUseCase: FindByIdUseCase,
        private readonly _cancelDeliveryUseCase: CancelDeliveryUseCase) { }

    // POST /deliveries
    @GrpcMethod('DeliveriesService', 'CreateDelivery')
    public async createDelivery(
        body: CreateDeliveryPresentationRequest,
    ) {
        this._createDeliveryUseCase.execute(body);
    }

    //GET /deliveries
    @GrpcMethod('DeliveriesService', 'ListDeliveries')
    listDeliveries() : Delivery[]  {
        // Lógica de listado + filtrado TODO aquí
        // Imagina que en algún momento quieres filtrar por status, ciudad, etc.
        // y todo se va a seguir metiendo aquí.
        return this._listDeliveriesUseCase.execute();
    }

    // // GET /deliveries/:id
    @GrpcMethod('DeliveriesService', 'GetDelivery')
    getDelivery(id: string) {
        return this._findByIdUseCase.execute(id);
    }

    // // PATCH /deliveries/:id/cancel
    @GrpcMethod('DeliveriesService', 'CancelDelivery')
    cancelDelivery(@Param('id') id: string) {
        return this._cancelDeliveryUseCase.execute(id);
    }
}
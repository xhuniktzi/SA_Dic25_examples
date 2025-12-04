import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateDeliveryPresentationRequest } from './dto/create-delivery.dto';
import { CreateDeliveryUseCase } from '../application/use-cases/create-delivery.use-case';
import { ListDeliveriesUseCase } from '../application/use-cases/list-deliveries.use-case';
import { FindByIdUseCase } from '../application/use-cases/find-by-id.use-case';
import { CancelDeliveryUseCase } from '../application/use-cases/cancel-delivery.use-case';

@Controller('deliveries')
export class DeliveriesRestController {

    constructor(private readonly _createDeliveryUseCase: CreateDeliveryUseCase,
        private readonly _listDeliveriesUseCase: ListDeliveriesUseCase,
        private readonly _findByIdUseCase: FindByIdUseCase,
        private readonly _cancelDeliveryUseCase: CancelDeliveryUseCase) { }

    // POST /deliveries
    @Post()
    createDelivery(
        @Body()
        body: CreateDeliveryPresentationRequest,
    ) {
        this._createDeliveryUseCase.execute(body);
    }

    //GET /deliveries
    @Get()
    listDeliveries() {
        // Lógica de listado + filtrado TODO aquí
        // Imagina que en algún momento quieres filtrar por status, ciudad, etc.
        // y todo se va a seguir metiendo aquí.
        return this._listDeliveriesUseCase.execute();
    }

    // // GET /deliveries/:id
    @Get(':id')
    getDelivery(@Param('id') id: string) {
        return this._findByIdUseCase.execute(id);
    }

    // // PATCH /deliveries/:id/cancel
    @Patch(':id/cancel')
    cancelDelivery(@Param('id') id: string) {
        return this._cancelDeliveryUseCase.execute(id);
    }
}
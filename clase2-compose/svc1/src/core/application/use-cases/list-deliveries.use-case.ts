import { Injectable } from "@nestjs/common";
import axios from "axios";
import { StorageContract } from "src/core/domain/contracts/storage.contract";
import { Delivery } from "src/core/domain/interfaces/delivery.interface";

@Injectable()
export class ListDeliveriesUseCase {
    private readonly http = axios.create({
        baseURL: 'http://servicio2:3000/currency',
    })
    constructor(private readonly _deliveries: StorageContract) {}

    async execute(): Promise<Delivery[]> {
        const currencies = await this.http.get('/USD');
        console.log('Currency Service Response:', currencies.data);
        return await this._deliveries.listDeliveries();
    }
}
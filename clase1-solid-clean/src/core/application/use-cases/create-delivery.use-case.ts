import { Delivery } from "src/core/domain/interfaces/delivery.interface";
import { CreateDeliveryUseCaseRequest } from "../dtos/create-delivery.dto";
import { StorageContract } from "src/core/domain/contracts/storage.contract";
import { InvalidRequestError } from "src/core/domain/errors/invalid-request.error";
import { Injectable } from "src/shared/di/injectable";

@Injectable()
export class CreateDeliveryUseCase {
    constructor(private readonly _deliveries: StorageContract) {}

    execute(body: CreateDeliveryUseCaseRequest) {
        // Mezcla de validación, cálculo de negocio, persistencia y mapeo de respuesta…

        // Validaciones básicas a mano, repetitivas y poco claras
        if (!body.originCity || !body.destinationCity) {
            throw new InvalidRequestError('originCity and destinationCity are required');
        }

        if (typeof body.distanceKm !== 'number' || body.distanceKm <= 0) {
            throw new InvalidRequestError('distanceKm must be > 0');
        }

        if (typeof body.weightKg !== 'number' || body.weightKg <= 0) {
            throw new InvalidRequestError('weightKg must be > 0');
        }

        if (!['STANDARD', 'EXPRESS'].includes(body.serviceType)) {
            throw new InvalidRequestError('serviceType must be STANDARD or EXPRESS');
        }

        if (typeof body.fragile !== 'boolean') {
            throw new InvalidRequestError('fragile must be boolean');
        }

        // Lógica de negocio mezclada aquí mismo
        // “Reglas” mágicas, números mágicos, todo hardcodeado
        let baseRatePerKm = 2; // Q2 por km
        if (body.distanceKm > 100 && body.distanceKm <= 300) {
            baseRatePerKm = 1.8;
        } else if (body.distanceKm > 300) {
            baseRatePerKm = 1.5;
        }

        const basePrice = body.distanceKm * baseRatePerKm;

        let expressFee = 0;
        if (body.serviceType === 'EXPRESS') {
            expressFee = basePrice * 0.35; // +35% por express
        }

        let fragileFee = 0;
        if (body.fragile) {
            fragileFee = 15; // Q15 extra por envío frágil
        }

        const totalPrice = Number((basePrice + expressFee + fragileFee).toFixed(2));

        // Generación de ID y timestamps también aquí (sin abstracciones)
        const id = 'D-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

        const delivery: Delivery = {
            id,
            createdAt: new Date().toISOString(),
            originCity: body.originCity,
            destinationCity: body.destinationCity,
            distanceKm: body.distanceKm,
            weightKg: body.weightKg,
            serviceType: body.serviceType,
            fragile: body.fragile,
            status: 'ACTIVE',
            basePrice,
            fragileFee,
            expressFee,
            totalPrice,
        };

        // Persistencia en memoria mezclada en el controller
        this._deliveries.saveDelivery(delivery);

        // El controller decide también el “shape” de la respuesta
        return {
            id: delivery.id,
            status: delivery.status,
            totalPrice: delivery.totalPrice,
            summary: `${delivery.originCity} -> ${delivery.destinationCity} (${delivery.serviceType})`,
            breakdown: {
                basePrice: delivery.basePrice,
                fragileFee: delivery.fragileFee,
                expressFee: delivery.expressFee,
            },
            createdAt: delivery.createdAt,
        };
    }
}
import { Test, TestingModule } from "@nestjs/testing";
import { CreateDeliveryUseCase } from "./create-delivery.use-case";
import { StorageContract } from "../../domain/contracts/storage.contract";
import { CancelDeliveryUseCase } from "./cancel-delivery.use-case";

describe("Save Delivery Use Case", () => {
    let useCase: CreateDeliveryUseCase;
    let repoMock: { saveDelivery: jest.Mock, listDeliveries: jest.Mock, findDeliveryById: jest.Mock, updateDelivery: jest.Mock }


    beforeEach(async () => {
        repoMock = {
            saveDelivery: jest.fn(),
            listDeliveries: jest.fn(),
            findDeliveryById: jest.fn(),
            updateDelivery: jest.fn(),
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateDeliveryUseCase,
                { provide: StorageContract, useValue: repoMock },
            ],
        }).compile();

        useCase = module.get<CreateDeliveryUseCase>(CreateDeliveryUseCase);
    });


    it("Save order", async () => {
        const result = await useCase.execute({
            "originCity": "Guatemala City",
            "destinationCity": "Quetzaltenango",
            "distanceKm": 200,
            "weightKg": 12.5,
            "serviceType": "STANDARD",
            "fragile": false
        });

        expect(result).toEqual(expect.objectContaining({
            "status": "ACTIVE",
            "totalPrice": 360,
            "summary": "Guatemala City -> Quetzaltenango (STANDARD)",
            "breakdown": {
                "basePrice": 360,
                "fragileFee": 0,
                "expressFee": 0
            },
        }));

        expect(repoMock.saveDelivery).toHaveBeenCalled();

        expect(repoMock.saveDelivery).toHaveBeenCalledWith(expect.objectContaining({
            "originCity": "Guatemala City",
            "destinationCity": "Quetzaltenango",
            "distanceKm": 200,
            "weightKg": 12.5,
            "serviceType": "STANDARD",
            "fragile": false
        }));
    })
});


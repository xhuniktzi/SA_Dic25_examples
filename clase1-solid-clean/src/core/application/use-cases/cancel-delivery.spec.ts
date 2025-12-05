import { Test, TestingModule } from "@nestjs/testing";
import { CancelDeliveryUseCase } from "./cancel-delivery.use-case";
import { StorageContract } from "../../domain/contracts/storage.contract";
import { NotFoundError } from "../../domain/errors/not-found.error";

describe("Cancel Delivery Use Case ", () => {
    let useCase: CancelDeliveryUseCase;
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
                CancelDeliveryUseCase,
                { provide: StorageContract, useValue: repoMock },
            ],
        }).compile();

        useCase = module.get<CancelDeliveryUseCase>(CancelDeliveryUseCase);
    });

    it("Cancel delivery", async () => {
        repoMock.findDeliveryById.mockReturnValueOnce({
            id: 'delivery-123',
            status: 'ACTIVE',
            totalPrice: 500,
        });

        const result = await useCase.execute('delivery-123');

        expect(result).toEqual(expect.objectContaining({
            id: 'delivery-123',
            status: 'CANCELLED',
            totalPrice: 500,
            cancelledAt: expect.any(String),
        }));
    })

    it("Cancel non-existing delivery", async () => {
        repoMock.findDeliveryById.mockReturnValueOnce(null);

        expect(() => useCase.execute('non-existing-id')).toThrow(NotFoundError);
    })

    it("Cancel already cancelled delivery", async () => {
        repoMock.findDeliveryById.mockReturnValueOnce({
            id: 'delivery-456',
            status: 'CANCELLED',
            totalPrice: 300,
        });

        expect(() => useCase.execute('delivery-456')).toThrow('Delivery already cancelled');
    });
});
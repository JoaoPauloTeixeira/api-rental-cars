import { expect } from 'chai'
import { v4 as uuid } from 'uuid'
import sinon, { SinonMock, SinonSpy, SinonStub } from 'sinon'
import { DriverRepository } from '../src/4-framework/repositories/driver.repository'
import CreateVehicleRentalUseCase from '../src/2-business/useCases/vehicleRental/create.useCase'
import EndRentUseCase from '../src/2-business/useCases/vehicleRental/endRent.useCase'
import { VehicleRentalRepository } from '../src/4-framework/repositories/vehicleRental.repository'
import { VehicleRepository } from '../src/4-framework/repositories/vehicle.repository'
import { VehicleEntity } from '../src/1-enterprise/entities/vehicle.entity'
import { VehicleRentalEntity } from '../src/1-enterprise/entities/vehicleRental.entity'

let stub: SinonStub
let vehicleStub: SinonStub
let rentalStub: SinonStub
let updateVehicleStub: SinonStub
let createVehicleRentalUseCase: CreateVehicleRentalUseCase
let endRentUseCase: EndRentUseCase

describe('Driver context', () => {
    const mockRental = {
        id: uuid(),
        driverId: uuid(),
        driverName: 'Matheus Rodriguez',
        vehicleId: uuid(),
        vehicleLicensePlate: 'NDW7020',
        reason: 'viagem turismo',
        startDate: new Date(),
        endDate: new Date('2025/02/12'),
        active: true
    }

    const mockVehicle: VehicleEntity = {
        id: uuid(),
        licensePlate: 'NDW7020',
        color: 'black',
        brand: 'hyndai i30',
        available: true,
        active: true
    }

    const mockDriver = {
        id: uuid(),
        name: 'Robson Carvalho',
        document: '06649272035',
        birthDate: new Date('1982/09/02'),
        address: {
            street: 'Praça Barra do Ouro',
            number: 200,
            neighborhood: 'Jardim Piratininga',
            city: 'Sao Paulo',
            UF: 'SP',
            country: 'BR',
            zipCode: 23716150
        },
        active: true
    }

    const mockEndRental = {
        id: mockRental.id,
        vehicleId: mockVehicle.id,
        returnDate: new Date(),
        active: false
    }

    beforeEach(() => {
        createVehicleRentalUseCase = new CreateVehicleRentalUseCase()
        endRentUseCase = new EndRentUseCase()
    })

    afterEach(() => {
        if(stub) stub.restore()
        if(rentalStub) rentalStub.restore()
        if(vehicleStub) vehicleStub.restore()
    })

    describe('create rental', () => {
        it('success', async () => {
            vehicleStub = sinon.stub(VehicleRepository.prototype, 'getById').resolves(mockVehicle)
            rentalStub = sinon.stub(VehicleRentalRepository.prototype, 'get').resolves({
                count: 0,
                rows: [{} as VehicleRentalEntity]
            })
            stub = sinon.stub(DriverRepository.prototype, 'getById').resolves(mockDriver)
            updateVehicleStub = sinon.stub(VehicleRepository.prototype, 'update').resolves()
            
            stub = sinon.stub(VehicleRentalRepository.prototype, 'insert')

            await createVehicleRentalUseCase.run(mockRental)
            expect(vehicleStub.calledWith(mockRental.vehicleId)).to.be.true
            expect(rentalStub.calledWith({ driverId: mockRental.driverId })).to.be.true
            expect(stub.calledWith(mockRental))

            updateVehicleStub.restore()
        })
    })

    describe('end rental', () => {
        it('success', async () => {
            rentalStub = sinon.stub(VehicleRentalRepository.prototype, 'endRental').resolves()
            vehicleStub = sinon.stub(VehicleRepository.prototype, 'update').resolves()

            await endRentUseCase.run(mockEndRental)
            expect(rentalStub.called).to.be.true
            expect(vehicleStub.called).to.be.true

            vehicleStub.restore()
        })
    })
})
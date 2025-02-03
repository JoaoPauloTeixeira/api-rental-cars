import { expect } from 'chai'
import CreateDriverUseCase from '../src/2-business/useCases/driver/create.useCase'
import { v4 as uuid } from 'uuid'
import sinon, { SinonSpy, SinonStub } from 'sinon'
import { DriverRepository } from '../src/4-framework/repositories/driver.repository'
import GetDriverByIdUseCase from '../src/2-business/useCases/driver/getById.useCase'
import UpdateDriverUseCase from '../src/2-business/useCases/driver/update.useCase'

let spy: SinonSpy
let stub: SinonStub
let createDriverUseCase: CreateDriverUseCase
let getByIdUseCase: GetDriverByIdUseCase
let updateDriverUseCase: UpdateDriverUseCase

describe('Driver context', () => {
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

    beforeEach(() => {
        createDriverUseCase = new CreateDriverUseCase()
        getByIdUseCase = new GetDriverByIdUseCase()
        updateDriverUseCase = new UpdateDriverUseCase()
    })

    afterEach(() => {
        if(stub) stub.restore()
    })

    describe('create driver', () => {
        it('success', async () => {
            stub = sinon.stub(DriverRepository.prototype, 'insert')

            await createDriverUseCase.run(mockDriver)
            expect(stub.calledWith(mockDriver)).to.be.true
        })
    })

    describe('get by id', () => {
        it('success', async () => {
            stub = sinon.stub(DriverRepository.prototype, 'getById').resolves(mockDriver)

            const result = await getByIdUseCase.run(mockDriver.id)
            expect(stub.calledWith(mockDriver.id)).to.be.true
            expect(result).to.equal(mockDriver)
        })
    })

    describe('udpdate', () => {
        it('success -> It must be possible to update the drivers name', async () => {
            stub = sinon.stub(DriverRepository.prototype, 'update').resolves()

            await updateDriverUseCase.run({
                    id: mockDriver.id,
                    name: 'Robson Andrade'
            })

            expect(stub.calledWith({ id: mockDriver.id, name: 'Robson Andrade' })).to.be.true
        })
    })
})
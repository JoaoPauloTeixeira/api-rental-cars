import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseController } from "../base.controller";
import { Output } from '../../../2-business/dto/output';
import { VehicleRentalEntity } from '../../../1-enterprise/entities/vehicleRental.entity';
import GetVehicleRentalByIdUseCase from '../../../2-business/useCases/vehicleRental/getById.useCase';

@Service()
export class GetVehicleRentalByIdController extends BaseController<string, VehicleRentalEntity> {

    private useCase: GetVehicleRentalByIdUseCase;

    constructor() {
      super();
      this.useCase = Container.get(GetVehicleRentalByIdUseCase);
    }

    async run(id: string): Promise<Output<VehicleRentalEntity>> {
        try {
            const response = await this.useCase.run(id)
            
            return {
                status: 'success',
                httpCode: 200,
                data: response
            }
        } catch (error) {
            throw error
        }
    }

}

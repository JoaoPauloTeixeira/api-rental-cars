import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseController } from "../base.controller";
import { Output } from '../../../2-business/dto/output';
import GetVehicleByIdUseCase from '../../../2-business/useCases/vehicle/getById.useCase';
import { VehicleEntity } from '../../../1-enterprise/entities/vehicle.entity';

@Service()
export class GetVehicleByIdController extends BaseController<string, VehicleEntity> {

    private useCase: GetVehicleByIdUseCase;

    constructor() {
      super();
      this.useCase = Container.get(GetVehicleByIdUseCase);
    }

    async run(id: string): Promise<Output<VehicleEntity>> {
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

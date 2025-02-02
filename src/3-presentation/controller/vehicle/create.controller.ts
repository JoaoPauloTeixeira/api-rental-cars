import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseController } from "../base.controller";
import { Output } from '../../../2-business/dto/output';
import CreateVehicleUseCase from '../../../2-business/useCases/vehicle/create.useCase';
import { InputCreateVehicleDto } from '../../../2-business/dto/vehicle/vehicle.dto';

@Service()
export class CreateVehicleController extends BaseController<InputCreateVehicleDto, void> {

    private useCase: CreateVehicleUseCase;

    constructor() {
      super();
      this.useCase = Container.get(CreateVehicleUseCase);
    }

    async run(input: InputCreateVehicleDto): Promise<Output<void>> {
        try {
            await this.useCase.run(input)
            
            return {
                status: 'success',
                httpCode: 204
            }
        } catch (error) {
            throw error
        }
    }

}

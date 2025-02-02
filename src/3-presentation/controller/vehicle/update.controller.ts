import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseController } from "../base.controller";
import { Output } from '../../../2-business/dto/output';
import { InputUpdateVehicleDto } from '../../../2-business/dto/vehicle/vehicle.dto';
import UpdateVehicleUseCase from '../../../2-business/useCases/vehicle/update.useCase';

@Service()
export class UpdateVehicleController extends BaseController<InputUpdateVehicleDto, void> {

    private useCase: UpdateVehicleUseCase;

    constructor() {
      super();
      this.useCase = Container.get(UpdateVehicleUseCase);
    }

    async run(input: InputUpdateVehicleDto): Promise<Output<void>> {
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

import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseController } from "../base.controller";
import { Output } from '../../../2-business/dto/output';
import { InputCreateVehicleRentalDto } from '../../../2-business/dto/vehicleRental/vehicleRental.dto';
import CreateVehicleRentalUseCase from '../../../2-business/useCases/vehicleRental/create.useCase';

@Service()
export class CreateVehicleRentalController extends BaseController<InputCreateVehicleRentalDto, void> {

    private useCase: CreateVehicleRentalUseCase;

    constructor() {
      super();
      this.useCase = Container.get(CreateVehicleRentalUseCase);
    }

    async run(input: InputCreateVehicleRentalDto): Promise<Output<void>> {
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

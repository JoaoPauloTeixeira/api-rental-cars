import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseController } from "../base.controller";
import { Output } from '../../../2-business/dto/output';
import { InputGetVehicleRentalFiltersDto, OutputGetVehicleRentalDto } from '../../../2-business/dto/vehicleRental/vehicleRental.dto';
import GetVehicleRentalUseCase from '../../../2-business/useCases/vehicleRental/get.useCase';

@Service()
export class GetVehicleRentalController extends BaseController<InputGetVehicleRentalFiltersDto, OutputGetVehicleRentalDto> {

    private useCase: GetVehicleRentalUseCase;

    constructor() {
      super();
      this.useCase = Container.get(GetVehicleRentalUseCase);
    }

    async run(input: InputGetVehicleRentalFiltersDto): Promise<Output<OutputGetVehicleRentalDto>> {
        try {
            const response = await this.useCase.run(input)
            
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

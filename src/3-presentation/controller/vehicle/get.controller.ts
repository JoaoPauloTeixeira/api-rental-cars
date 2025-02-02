import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseController } from "../base.controller";
import { Output } from '../../../2-business/dto/output';
import { InputGetVehicleFiltersDto, OutputGetVehicleDto } from '../../../2-business/dto/vehicle/vehicle.dto';
import GetVehicleUseCase from '../../../2-business/useCases/vehicle/get.useCase';

@Service()
export class GetVehicleController extends BaseController<InputGetVehicleFiltersDto, OutputGetVehicleDto> {

    private useCase: GetVehicleUseCase;

    constructor() {
      super();
      this.useCase = Container.get(GetVehicleUseCase);
    }

    async run(input: InputGetVehicleFiltersDto): Promise<Output<OutputGetVehicleDto>> {
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

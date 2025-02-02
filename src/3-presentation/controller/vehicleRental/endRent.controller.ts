import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseController } from "../base.controller";
import { Output } from '../../../2-business/dto/output';
import { InputEndRentDto } from '../../../2-business/dto/vehicleRental/vehicleRental.dto';
import EndRentUseCase from '../../../2-business/useCases/vehicleRental/endRent.useCase';

@Service()
export class EndRentController extends BaseController<InputEndRentDto, void> {

    private useCase: EndRentUseCase;

    constructor() {
      super();
      this.useCase = Container.get(EndRentUseCase);
    }

    async run(input: InputEndRentDto): Promise<Output<void>> {
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

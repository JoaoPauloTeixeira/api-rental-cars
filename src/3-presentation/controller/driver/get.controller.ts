import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseController } from "../base.controller";
import { InputGetDriverFiltersDto, OutputGetDriverDto } from '../../../2-business/dto/driver/driver.dto';
import { Output } from '../../../2-business/dto/output';
import GetDriverUseCase from '../../../2-business/useCases/driver/get.useCase';

@Service()
export class GetDriverController extends BaseController<InputGetDriverFiltersDto, OutputGetDriverDto> {

    private useCase: GetDriverUseCase;

    constructor() {
      super();
      this.useCase = Container.get(GetDriverUseCase);
    }

    async run(input: InputGetDriverFiltersDto): Promise<Output<OutputGetDriverDto>> {
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

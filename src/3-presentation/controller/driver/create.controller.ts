import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseController } from "../base.controller";
import { InputCreateDriverDto } from '../../../2-business/dto/driver/driver.dto';
import { Output } from '../../../2-business/dto/output';
import CreateDriverUseCase from '../../../2-business/useCases/driver/create.useCase';

@Service()
export class CreateDriverController extends BaseController<InputCreateDriverDto, void> {

    private useCase: CreateDriverUseCase;

    constructor() {
      super();
      this.useCase = Container.get(CreateDriverUseCase);
    }

    async run(input: InputCreateDriverDto): Promise<Output<void>> {
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

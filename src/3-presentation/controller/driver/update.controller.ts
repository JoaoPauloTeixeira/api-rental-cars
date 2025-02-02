import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseController } from "../base.controller";
import { InputUpdateDriverDto } from '../../../2-business/dto/driver/driver.dto';
import { Output } from '../../../2-business/dto/output';
import UpdateDriverUseCase from '../../../2-business/useCases/driver/update.useCase';

@Service()
export class UpdateDriverController extends BaseController<InputUpdateDriverDto, void> {

    private useCase: UpdateDriverUseCase;

    constructor() {
      super();
      this.useCase = Container.get(UpdateDriverUseCase);
    }

    async run(input: InputUpdateDriverDto): Promise<Output<void>> {
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

import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseController } from "../base.controller";
import { InputInactivateDriverDto } from '../../../2-business/dto/driver/driver.dto';
import { Output } from '../../../2-business/dto/output';
import InactivateDriverUseCase from '../../../2-business/useCases/driver/inactivate.useCase';

@Service()
export class InactivateDriverController extends BaseController<InputInactivateDriverDto, void> {

    private useCase: InactivateDriverUseCase;

    constructor() {
      super();
      this.useCase = Container.get(InactivateDriverUseCase);
    }

    async run(input: InputInactivateDriverDto): Promise<Output<void>> {
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

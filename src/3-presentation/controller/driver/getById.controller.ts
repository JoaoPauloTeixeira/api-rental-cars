import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseController } from "../base.controller";
import { Output } from '../../../2-business/dto/output';
import { DriverEntity } from '../../../1-enterprise/entities/driver.entity';
import GetDriverByIdUseCase from '../../../2-business/useCases/driver/getById.useCase';

@Service()
export class GetDriverByIdController extends BaseController<string, DriverEntity> {

    private useCase: GetDriverByIdUseCase;

    constructor() {
      super();
      this.useCase = Container.get(GetDriverByIdUseCase);
    }

    async run(id: string): Promise<Output<DriverEntity>> {
        try {
            const response = await this.useCase.run(id)
            
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

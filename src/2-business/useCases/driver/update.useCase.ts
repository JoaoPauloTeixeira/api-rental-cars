import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseUseCase } from "../base.useCase";
import { InputUpdateDriverDto } from '../../dto/driver/driver.dto';
import { IDriverRepository } from '../../repositories/driver.repository';
import { DriverRepository } from '../../../4-framework/repositories/driver.repository';

@Service()
class UpdateDriverUseCase extends BaseUseCase<InputUpdateDriverDto, void> {

  private repo: IDriverRepository;

  constructor() {
    super();
    this.repo = Container.get(DriverRepository);
  }

  async run(input: InputUpdateDriverDto): Promise<any> {
    try {
      await this.repo.update(input)
    } catch (error) {
      throw error
    }
  }
}

export default UpdateDriverUseCase;
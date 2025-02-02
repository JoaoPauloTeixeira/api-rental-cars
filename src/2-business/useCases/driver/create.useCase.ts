import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseUseCase } from "../base.useCase";
import { InputCreateDriverDto } from '../../dto/driver/driver.dto';
import { IDriverRepository } from '../../repositories/driver.repository';
import { DriverRepository } from '../../../4-framework/repositories/driver.repository';
import { v4 } from 'uuid';

@Service()
class CreateDriverUseCase extends BaseUseCase<InputCreateDriverDto, void> {

  private repo: IDriverRepository;

  constructor() {
    super();
    this.repo = Container.get(DriverRepository);
  }

  async run(input: InputCreateDriverDto): Promise<void> {
    try {
      await this.repo.insert({ ...input, id: v4(), active: true })
    } catch (error) {
      throw error
    }
  }
}

export default CreateDriverUseCase;
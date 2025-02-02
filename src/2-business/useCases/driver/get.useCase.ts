import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseUseCase } from "../base.useCase";
import { IDriverRepository } from '../../repositories/driver.repository';
import { DriverRepository } from '../../../4-framework/repositories/driver.repository';
import { InputGetDriverFiltersDto, OutputGetDriverDto } from '../../dto/driver/driver.dto';

@Service()
class GetDriverUseCase extends BaseUseCase<InputGetDriverFiltersDto, OutputGetDriverDto> {

  private repo: IDriverRepository;

  constructor() {
    super();
    this.repo = Container.get(DriverRepository);
  }

  async run(input: InputGetDriverFiltersDto): Promise<OutputGetDriverDto> {
        return this.repo.get(input)
    }
    
}

export default GetDriverUseCase;
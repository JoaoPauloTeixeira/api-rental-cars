import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseUseCase } from "../base.useCase";
import { IDriverRepository } from '../../repositories/driver.repository';
import { DriverRepository } from '../../../4-framework/repositories/driver.repository';
import { DriverEntity } from '../../../1-enterprise/entities/driver.entity';

@Service()
class GetDriverByIdUseCase extends BaseUseCase<string, DriverEntity> {

  private repo: IDriverRepository;

  constructor() {
    super();
    this.repo = Container.get(DriverRepository);
  }

  async run(id: string): Promise<DriverEntity> {
        return this.repo.getById(id)
    }
    
}

export default GetDriverByIdUseCase;
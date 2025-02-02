import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseUseCase } from "../base.useCase";
import { VehicleEntity } from '../../../1-enterprise/entities/vehicle.entity';
import { IVehicleRepository } from '../../repositories/vehicle.repository';
import { VehicleRepository } from '../../../4-framework/repositories/vehicle.repository';

@Service()
class GetVehicleByIdUseCase extends BaseUseCase<string, VehicleEntity> {

  private repo: IVehicleRepository;

  constructor() {
    super();
    this.repo = Container.get(VehicleRepository);
  }

  async run(id: string): Promise<VehicleEntity> {
        return this.repo.getById(id)
  }
    
}

export default GetVehicleByIdUseCase;
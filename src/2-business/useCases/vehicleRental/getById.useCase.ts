import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseUseCase } from "../base.useCase";
import { IVehicleRentalRepository } from '../../repositories/vehicleRental.repository';
import { VehicleRentalRepository } from '../../../4-framework/repositories/vehicleRental.repository';
import { VehicleRentalEntity } from '../../../1-enterprise/entities/vehicleRental.entity';

@Service()
class GetVehicleRentalByIdUseCase extends BaseUseCase<string, VehicleRentalEntity> {

  private repo: IVehicleRentalRepository;

  constructor() {
    super();
    this.repo = Container.get(VehicleRentalRepository);
  }

  async run(id: string): Promise<VehicleRentalEntity> {
        return this.repo.getById(id)
  }
    
}

export default GetVehicleRentalByIdUseCase;
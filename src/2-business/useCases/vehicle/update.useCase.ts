import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseUseCase } from "../base.useCase";
import { InputUpdateVehicleDto } from '../../dto/vehicle/vehicle.dto';
import { IVehicleRepository } from '../../repositories/vehicle.repository';
import { VehicleRepository } from '../../../4-framework/repositories/vehicle.repository';

@Service()
class UpdateVehicleUseCase extends BaseUseCase<InputUpdateVehicleDto, void> {

  private repo: IVehicleRepository;

  constructor() {
    super();
    this.repo = Container.get(VehicleRepository);
  }

  async run(input: InputUpdateVehicleDto): Promise<any> {
    try {
      await this.repo.update(input)
    } catch (error) {
      throw error
    }
  }
}

export default UpdateVehicleUseCase;
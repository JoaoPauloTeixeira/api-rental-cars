import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseUseCase } from "../base.useCase";
import { InputGetVehicleFiltersDto, OutputGetVehicleDto } from '../../dto/vehicle/vehicle.dto';
import { IVehicleRepository } from '../../repositories/vehicle.repository';
import { VehicleRepository } from '../../../4-framework/repositories/vehicle.repository';

@Service()
class GetVehicleUseCase extends BaseUseCase<InputGetVehicleFiltersDto, OutputGetVehicleDto> {

  private repo: IVehicleRepository;

  constructor() {
    super();
    this.repo = Container.get(VehicleRepository);
  }

  async run(input: InputGetVehicleFiltersDto): Promise<OutputGetVehicleDto> {
        return this.repo.get(input)
    }
    
}

export default GetVehicleUseCase;
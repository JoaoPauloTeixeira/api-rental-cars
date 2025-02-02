import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseUseCase } from "../base.useCase";
import { IVehicleRentalRepository } from '../../repositories/vehicleRental.repository';
import { VehicleRentalRepository } from '../../../4-framework/repositories/vehicleRental.repository';
import { InputGetVehicleRentalFiltersDto, OutputGetVehicleRentalDto } from '../../dto/vehicleRental/vehicleRental.dto';

@Service()
class GetVehicleRentalUseCase extends BaseUseCase<InputGetVehicleRentalFiltersDto, OutputGetVehicleRentalDto> {

  private repo: IVehicleRentalRepository;

  constructor() {
    super();
    this.repo = Container.get(VehicleRentalRepository);
  }

  async run(input: InputGetVehicleRentalFiltersDto): Promise<OutputGetVehicleRentalDto> {
        return this.repo.get(input)
    }
    
}

export default GetVehicleRentalUseCase;
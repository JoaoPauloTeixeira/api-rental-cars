import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseUseCase } from "../base.useCase";
import { IVehicleRentalRepository } from '../../repositories/vehicleRental.repository';
import { VehicleRentalRepository } from '../../../4-framework/repositories/vehicleRental.repository';
import { InputEndRentDto } from '../../dto/vehicleRental/vehicleRental.dto';
import { IVehicleRepository } from '../../repositories/vehicle.repository';
import { VehicleRepository } from '../../../4-framework/repositories/vehicle.repository';

@Service()
class EndRentUseCase extends BaseUseCase<InputEndRentDto, void> {

  private vehicleRentalRepo: IVehicleRentalRepository;
  private vehicleRepo: IVehicleRepository;

  constructor() {
    super();
    this.vehicleRentalRepo = Container.get(VehicleRentalRepository);
    this.vehicleRepo = Container.get(VehicleRepository);
  }

  async run(input: InputEndRentDto): Promise<void> {
    try {
        // using this promise because there is no dependency between the processes
        await Promise.all([
            this.vehicleRentalRepo.endRental({ ...input, returnDate: new Date(), active: false }),
            this.vehicleRepo.update({ id: input.vehicleId, available: true })
        ])
    } catch (error) {
      throw error
    }
  }
}

export default EndRentUseCase;
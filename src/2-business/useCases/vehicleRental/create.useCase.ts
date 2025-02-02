import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseUseCase } from "../base.useCase";
import { v4 } from 'uuid';
import { IVehicleRentalRepository } from '../../repositories/vehicleRental.repository';
import { VehicleRentalRepository } from '../../../4-framework/repositories/vehicleRental.repository';
import { InputCreateVehicleRentalDto } from '../../dto/vehicleRental/vehicleRental.dto';
import { IVehicleRepository } from '../../repositories/vehicle.repository';
import { VehicleRepository } from '../../../4-framework/repositories/vehicle.repository';
import { driverWithCurrentLease, vehicleNotFound, vehicleUnavailable } from '../../module/errors/errors';
import { IDriverRepository } from '../../repositories/driver.repository';
import { DriverRepository } from '../../../4-framework/repositories/driver.repository';

@Service()
class CreateVehicleRentalUseCase extends BaseUseCase<InputCreateVehicleRentalDto, void> {

  private vehicleRentalRepo: IVehicleRentalRepository;
  private vehicleRepo: IVehicleRepository;
  private driverRepo: IDriverRepository;

  constructor() {
    super();
    this.vehicleRentalRepo = Container.get(VehicleRentalRepository);
    this.vehicleRepo = Container.get(VehicleRepository);
    this.driverRepo = Container.get(DriverRepository);
  }

  async run(input: InputCreateVehicleRentalDto): Promise<void> {
    try {
      // using this promise.allSettled for the process to continue only when both are resolved or rejected as they are not dependent on each other
      const responses = await Promise.all([
        this.validateAvailableVehicle(input),
        this.validateAvailableDriver(input)
      ])

      await this.vehicleRentalRepo.insert({ ...input, id: v4(), active: true, vehicleBrand: responses[0].brand, driverName: responses[1].name })

      this.vehicleRepo.update({ id: input.vehicleId, available: false })
    } catch (error) {
      throw error
    }
  }

  private async validateAvailableVehicle(input: InputCreateVehicleRentalDto) {
    const vehicle = await this.vehicleRepo.getById(input.vehicleId)

    if (!vehicle) {
      throw vehicleNotFound
    }

    if (vehicle && !vehicle.available) {
      throw vehicleUnavailable
    }

    return vehicle
  }

  private async validateAvailableDriver(input: InputCreateVehicleRentalDto) {
    const vehicleRental = await this.vehicleRentalRepo.get({ driverId: input.driverId })

    for (const row of vehicleRental.rows) {
      if (row.active) {
        throw driverWithCurrentLease
      }
    }

    return this.driverRepo.getById(input.driverId)
  }
}

export default CreateVehicleRentalUseCase;
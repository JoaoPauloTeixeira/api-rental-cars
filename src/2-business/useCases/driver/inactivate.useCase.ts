import 'reflect-metadata';
import Container, { Service } from "typedi";
import { BaseUseCase } from "../base.useCase";
import { InputInactivateDriverDto } from '../../dto/driver/driver.dto';
import { IDriverRepository } from '../../repositories/driver.repository';
import { DriverRepository } from '../../../4-framework/repositories/driver.repository';
import { v4 } from 'uuid';
import { ISysParamsRepository } from '../../repositories/sysParams.repository';
import { SysParamsRepository } from '../../../4-framework/repositories/sysParams.repository';
import { VehicleRentalRepository } from '../../../4-framework/repositories/vehicleRental.repository';
import { IVehicleRentalRepository } from '../../repositories/vehicleRental.repository';
import { driverWithCurrentLease } from '../../module/errors/errors';

@Service()
class InactivateDriverUseCase extends BaseUseCase<InputInactivateDriverDto, void> {

  private driverRepo: IDriverRepository;
  private sysParams: ISysParamsRepository;
  private vehicleRentalRepo: IVehicleRentalRepository;

  constructor() {
    super();
    this.driverRepo = Container.get(DriverRepository);
    this.sysParams = Container.get(SysParamsRepository);
    this.vehicleRentalRepo = Container.get(VehicleRentalRepository);
  }

  async run(input: InputInactivateDriverDto): Promise<void> {
    try {
      await this.validatesCurrentRent(input.id)
      await this.driverRepo.update({ active: false, id: input.driver.id })

      this.sysParams.insert({ ...input, id: v4() })
    } catch (error) {
      throw error
    }
  }

  private async validatesCurrentRent(id: string) {
   const vehicleRental = await this.vehicleRentalRepo.get({ driverId: id })

    for (const row of vehicleRental.rows) {
      if (row.active) {
        throw driverWithCurrentLease
      }
    }
  }
}

export default InactivateDriverUseCase;
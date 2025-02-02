import { Service } from "typedi";
import { IVehicleRentalRepository } from "../../2-business/repositories/vehicleRental.repository";
import { Vehicle } from "../models/postgres/vehicle";
import { FindAndCountOptions } from "sequelize";
import { omit } from "lodash";
import { InputCreateVehicleRentalDto, InputEndRentDto, InputGetVehicleRentalFiltersDto, OutputGetVehicleRentalDto } from "../../2-business/dto/vehicleRental/vehicleRental.dto";
import { VehicleRental } from "../models/postgres/vehicleRental";
import { VehicleRentalEntity } from "../../1-enterprise/entities/vehicleRental.entity";


@Service()
export class VehicleRentalRepository implements IVehicleRentalRepository {
    
    async get(input: InputGetVehicleRentalFiltersDto): Promise<OutputGetVehicleRentalDto> {
        const filters = this.validateFilters(input) as FindAndCountOptions
        const response = await VehicleRental.findAndCountAll(filters)
        return response
    }

    async getById(id: string): Promise<VehicleRentalEntity> {
        return VehicleRental.findByPk(id)
    }

    async insert(input: InputCreateVehicleRentalDto): Promise<void> {
        await VehicleRental.create(omit(input))
    }

    async endRental(input: InputEndRentDto): Promise<void> {
        const { id } = input
        await VehicleRental.update(input, { where: { id} })
    }

    private validateFilters(input: InputGetVehicleRentalFiltersDto) {
        const where: InputGetVehicleRentalFiltersDto = {}

        if (input.driverId) {
            where.driverId = input.driverId
        }

        if (input.vehicleId) {
            where.vehicleId = input.vehicleId
        }

        if (input.active) {
            where.active = input.active
        }

        return { where, raw: true, nest: true }
    }

}
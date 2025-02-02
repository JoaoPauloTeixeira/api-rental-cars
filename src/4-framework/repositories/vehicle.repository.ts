import { Service } from "typedi";
import { IVehicleRepository } from "../../2-business/repositories/vehicle.repository";
import { VehicleEntity } from "../../1-enterprise/entities/vehicle.entity";
import { InputGetDriverFiltersDto } from "../../2-business/dto/driver/driver.dto";
import { OutputGetVehicleDto, InputCreateVehicleDto, InputGetVehicleFiltersDto, InputUpdateVehicleDto } from "../../2-business/dto/vehicle/vehicle.dto";
import { Vehicle } from "../models/postgres/vehicle";
import { FindAndCountOptions, Op } from "sequelize";
import { omit } from "lodash";


@Service()
export class VehicleRepository implements IVehicleRepository {
    
    async get(input: InputGetVehicleFiltersDto): Promise<OutputGetVehicleDto> {
        const filters = this.validateFilters(input) as FindAndCountOptions
        
        const response = await Vehicle.findAndCountAll(filters)

        return response
    }

    async getById(id: string): Promise<VehicleEntity> {
        return Vehicle.findByPk(id, { attributes: [ 'licensePlate', 'color', 'brand', 'available' ] })
    }

    async insert(input: InputCreateVehicleDto): Promise<void> {
        await Vehicle.create(omit(input))
    }

    async update(input: InputUpdateVehicleDto): Promise<void> {
        const { id } = input
        await Vehicle.update(input, { where: { id} })
    }

    private validateFilters(input: InputGetVehicleFiltersDto) {
        const where: InputGetVehicleFiltersDto = {}

        if (input.brand) {
            where.brand = input.brand
        }

        if (input.color) {
            where.color = input.color
        }

        return { where }
    }

}
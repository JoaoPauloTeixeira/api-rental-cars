import { VehicleEntity } from '../../1-enterprise/entities/vehicle.entity'
import { InputCreateVehicleDto, InputGetVehicleFiltersDto, InputUpdateVehicleDto, OutputGetVehicleDto } from '../dto/vehicle/vehicle.dto'

export interface IVehicleRepository {
    get(input: InputGetVehicleFiltersDto): Promise<OutputGetVehicleDto>
    getById(id: string): Promise<VehicleEntity>
    insert(input: InputCreateVehicleDto): Promise<void>
    update(input: InputUpdateVehicleDto): Promise<void>
}
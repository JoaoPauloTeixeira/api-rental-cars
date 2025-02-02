import { VehicleRentalEntity } from '../../1-enterprise/entities/vehicleRental.entity'
import { InputCreateVehicleRentalDto, InputEndRentDto, InputGetVehicleRentalFiltersDto, OutputGetVehicleRentalDto } from '../dto/vehicleRental/vehicleRental.dto'

export interface IVehicleRentalRepository {
    get(input: InputGetVehicleRentalFiltersDto): Promise<OutputGetVehicleRentalDto>
    getById(id: string): Promise<VehicleRentalEntity>
    insert(input: InputCreateVehicleRentalDto): Promise<void>
    endRental(input: InputEndRentDto): Promise<void>
}
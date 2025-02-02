import { VehicleRentalEntity } from "../../../1-enterprise/entities/vehicleRental.entity"

export interface InputCreateVehicleRentalDto {
    id: string
    driverId: string
    driverName: string
    vehicleId: string
    vehicleBrand: string
    reason: string
    startDate: Date
    endDate: Date
    active: boolean
}

export interface OutputGetVehicleRentalDto {
    rows: Array<VehicleRentalEntity>,
    count: number
}

export interface InputGetVehicleRentalFiltersDto {
    driverId?: string,
    vehicleId?: string
    active?: boolean
}

export interface InputEndRentDto {
    id: string
    vehicleId: string
    returnDate: Date
    active: boolean
}
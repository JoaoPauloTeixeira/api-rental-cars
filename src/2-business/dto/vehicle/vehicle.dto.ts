import { VehicleEntity } from "../../../1-enterprise/entities/vehicle.entity";

export interface InputCreateVehicleDto {
    id: string
    licensePlate: string
    color: string
    chassi: string
    renavam: string
    model: string
    brand: string
    active: boolean
    available?: boolean
}

export interface OutputGetVehicleDto {
    rows: Array<VehicleEntity>,
    count: number
}

export interface InputGetVehicleFiltersDto {
    color?: string,
    brand?: string
}

export interface InputUpdateVehicleDto {
    id: string
    available?: boolean
    active?: string
}
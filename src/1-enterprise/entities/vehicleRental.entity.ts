import { VehicleRentalParams } from "../models/vehicleRental"

export interface VehicleRentalEntity {
    id: string
    driverId: string
    vehicleId: string
    reason: string
    startDate: Date
    endDate: Date
    returnDate: Date
    active: boolean
}
import { Address } from "../models/driver"

export interface DriverEntity {
    id: string
    name: string
    document: string
    birthDate: Date
    address?: Address
}
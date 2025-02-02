import { DriverEntity } from "../../../1-enterprise/entities/driver.entity"
import { UserEntity } from "../../../1-enterprise/entities/user.entity"
import { ActionSysParams } from "../../../1-enterprise/enum/sysParams"
import { Address } from "../../../1-enterprise/models/driver"

export interface InputCreateDriverDto {
    id: string
    name: string
    document: string
    birthDate: Date
    address: Address
    active: boolean
}

export interface InputInactivateDriverDto {
    id: string
    driver: Partial<DriverEntity>
    user: Partial<UserEntity>
    action: ActionSysParams
    reason: string
}

export interface InputGetDriverFiltersDto {
    name?: string,
    document?: string
}

export interface OutputGetDriverDto {
    rows: Array<{id: string, name: string}>,
    count: number
}

export interface InputUpdateDriverDto {
    id: string
    name?: string
    address?: Address
    active?: boolean
}

export interface DataToUpdateDriverDto {
    name?: string
    address?: Address
}
import { DriverEntity } from '../../1-enterprise/entities/driver.entity'
import { InputCreateDriverDto, InputGetDriverFiltersDto, InputUpdateDriverDto, OutputGetDriverDto } from '../dto/driver/driver.dto'

export interface IDriverRepository {
    get(input: InputGetDriverFiltersDto): Promise<OutputGetDriverDto>
    getById(id: string): Promise<DriverEntity>
    insert(input: InputCreateDriverDto): Promise<void>
    update(input: InputUpdateDriverDto): Promise<void>
}
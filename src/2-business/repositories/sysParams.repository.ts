import { InputInactivateDriverDto } from '../dto/driver/driver.dto'

export interface ISysParamsRepository {
    insert(input: InputInactivateDriverDto): Promise<void>
}
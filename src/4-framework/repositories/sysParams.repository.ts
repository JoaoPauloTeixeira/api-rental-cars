import { Service } from "typedi";
import { ISysParamsRepository } from "../../2-business/repositories/sysParams.repository";
import { InputInactivateDriverDto } from "../../2-business/dto/driver/driver.dto";
import { SysParams } from "../models/postgres/sysParams";
import { omit } from "lodash";


@Service()
export class SysParamsRepository implements ISysParamsRepository {
    
    async insert(input: InputInactivateDriverDto): Promise<void> {
        await SysParams.create(omit(input))
    }

}
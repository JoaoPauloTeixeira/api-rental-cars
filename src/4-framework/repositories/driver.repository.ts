
import { Service } from "typedi";
import { Driver } from "../models/postgres/driver";
import { InputGetDriverFiltersDto, InputCreateDriverDto, OutputGetDriverDto, InputUpdateDriverDto } from "../../2-business/dto/driver/driver.dto";
import { omit } from "lodash";
import { IDriverRepository } from "../../2-business/repositories/driver.repository";
import { DriverEntity } from "../../1-enterprise/entities/driver.entity";
import { FindAndCountOptions, Op } from "sequelize";
import { v4 } from "uuid";

@Service()
export class DriverRepository implements IDriverRepository {

    async get(input: InputGetDriverFiltersDto): Promise<OutputGetDriverDto> {
        const filters = this.validateQuery(input) as FindAndCountOptions
        
        const response = await Driver.findAndCountAll(filters)

        return response
    }

    async  getById(id: string): Promise<DriverEntity> {
        return Driver.findByPk(id, { attributes: [ 'id', 'name' ] })
    }
    
    async insert(input: InputCreateDriverDto): Promise<void> {
        await Driver.create(omit({ ...input, id: v4(), active: true }))
    }

    async update(input: InputUpdateDriverDto): Promise<void> {
        const { id } = input
        await Driver.update(input, { where: { id} })
    }

    private validateQuery(input: InputGetDriverFiltersDto) {
        const where: InputGetDriverFiltersDto = {}

        if (input.name) {
            where.name = input.name
        }

        if (input.document) {
            where.document = input.document
        }

        return {
            where,
            attributes: [ 'id', 'name' ]
        }
    }
}
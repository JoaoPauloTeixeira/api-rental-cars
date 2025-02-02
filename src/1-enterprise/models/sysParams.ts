import { DriverEntity } from "../entities/driver.entity"
import { UserEntity } from "../entities/user.entity"
import { ActionSysParams } from "../enum/sysParams"

export interface SysParams {
    id: string
    driver: Partial<DriverEntity>
    user: Partial<UserEntity>
    action: ActionSysParams
    reason: string
}
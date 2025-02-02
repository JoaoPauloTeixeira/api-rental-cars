import { UserRoleEnum } from "../enum/user"

export interface UserEntity {
    id: string
    name: string
    document: string
    role: UserRoleEnum
}
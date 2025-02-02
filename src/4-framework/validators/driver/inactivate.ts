import { IsEnum, IsNotEmpty, IsString, Length, ValidateNested } from "class-validator";
import { AddressValidationSchema } from "./create";
import { Type } from "class-transformer";
import { UserRoleEnum } from "../../../1-enterprise/enum/user";
import { ActionSysParams } from "../../../1-enterprise/enum/sysParams";

class SysParamsDriverValidationSchema {

    @IsNotEmpty()
    @IsString()
    id!: string;

    @IsNotEmpty()
    @IsString()
    @Length(11)
    document!: string;
}

class SysParamsUserValidationSchema {

    @IsNotEmpty()
    @IsString()
    id!: string;

    @IsNotEmpty()
    @IsEnum(UserRoleEnum)
    role!: UserRoleEnum;
}

export class InactivateDriverValidationSchema {
    
    @ValidateNested({ each: true })
    @Type(() => SysParamsDriverValidationSchema)
    driver!: SysParamsDriverValidationSchema;

    @ValidateNested({ each: true })
    @Type(() => SysParamsUserValidationSchema)
    user!: SysParamsUserValidationSchema;

    @IsNotEmpty()
    @IsEnum(ActionSysParams)
    action!: ActionSysParams;

    @IsNotEmpty()
    @IsString()
    reason!: string;

}
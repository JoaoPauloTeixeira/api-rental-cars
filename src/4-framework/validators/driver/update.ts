import { IsOptional, IsString, Length, ValidateNested } from "class-validator";
import { AddressValidationSchema } from "./create";
import { Type } from "class-transformer";

export class UpdateDriverValidationSchema {
    
    @Length(3, 50)
    @IsOptional()
    @IsString()
    name!: string;

    @ValidateNested({ each: true })
    @IsOptional()
    @Type(() => AddressValidationSchema)
    address!: AddressValidationSchema;
  }
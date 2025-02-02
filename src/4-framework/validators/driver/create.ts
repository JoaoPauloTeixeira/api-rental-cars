import { IsDateString, IsNotEmpty, isString, IsString, Length, ValidateNested, IsNumber, Max } from "class-validator";
import { Type } from "class-transformer";

export class AddressValidationSchema {
    @Length(5, 20)
    @IsNotEmpty()
    @IsString()
    street!: string;

    @Length(5, 20)
    @IsNotEmpty()
    @IsNumber()
    number: number

    @Length(5, 20)
    @IsNotEmpty()
    @IsString()
    neighborhood: string

    @Length(5, 20)
    @IsNotEmpty()
    @IsString()
    city: string

    @Length(2)
    @IsNotEmpty()
    @IsString()
    UF: string

    @Length(5, 20)
    @IsNotEmpty()
    @IsString()
    country: string

    @Length(8)
    @IsNotEmpty()
    @IsNumber()
    zipCode: number
}
export class CreateDriverValidationSchema {
    
    @Length(3, 50)
    @IsNotEmpty()
    @IsString()
    name!: string;
  
    @Length(11)
    @IsNotEmpty()
    @IsString()
    document!: string;

    @IsNotEmpty()
    @IsDateString()
    birthDate!: Date;

    @ValidateNested({ each: true })
    @Type(() => AddressValidationSchema)
    address!: AddressValidationSchema;
  }
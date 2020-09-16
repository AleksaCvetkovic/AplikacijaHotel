import * as Validator from 'class-validator';

export class addAdministratorDto{
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/^[a-z][a-z0-9\.]{3,30}[a-z0-9]$/)
    
    email: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(5,128)

    password: string;
}

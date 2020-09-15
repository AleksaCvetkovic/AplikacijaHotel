import { Body, Controller, Post, Put, Req } from "@nestjs/common"
import { loginAdministratorDto } from "src/dtos/administrator/login.administrator.dto";
import { ApiResponse } from "src/misk/api.response.class";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as crypto from 'crypto';
import { LoginInfoDto } from "src/dtos/auth/loginInfo.dto";
import * as jwt from 'jsonwebtoken';
import { jwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { Request } from "express";
import { JwtSecret } from "config/jwt.secret";
import { UserRegistrationDto } from "src/dtos/user/user.registration.dto";
import { UserService } from "src/services/user/user.service";
import { loginUserDto } from "src/dtos/user/login.user.dto";

@Controller('auth')
export class AuthController {
    constructor(
        public administratorService: AdministratorService,
        public userService: UserService,
        ){ }

    @Post('administrator/login')    
    async doAdministratorLogin(@Body() data: loginAdministratorDto,@Req()  req: Request): Promise<LoginInfoDto | ApiResponse> {
        const administrator = await  this.administratorService.getByEmail(data.email); 

        if (!administrator) {
            return new Promise(resolve => 
                resolve(new ApiResponse('error', -3001)));
        }
            const passwordHash = crypto.createHash('sha512');
            passwordHash.update(data.password);
            const passwordHashString = passwordHash.digest('hex').toUpperCase();

            if (administrator.passwordHash !== passwordHashString) {
                return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
            }
            const jwtData = new jwtDataDto();
            jwtData.role = 'administrator';
            jwtData.id = administrator.administratorId;
            jwtData.email = administrator.email;

            // eslint-disable-next-line prefer-const
            let sada = new Date();
            sada.setDate(sada.getDate() + 14);
            const istekDatuma = sada.getTime() / 1000;
            jwtData.exp = istekDatuma;

            jwtData.ip = req.ip.toString();
            jwtData.ua = req.headers["user-agent"];

            // eslint-disable-next-line prefer-const
            let token: string = jwt.sign(jwtData.toPlainObejt(), JwtSecret);

            const responseObject = new LoginInfoDto(
                administrator.administratorId,
                administrator.email,
                token
            );

                return new Promise(resolve => resolve(responseObject));
    }
    @Put('user/register')
    async registracijaUsera(@Body() data: UserRegistrationDto) {
        return await this.userService.register(data);
    }
    @Post('user/login')    
    async doUserLogin(@Body() data: loginUserDto,@Req()  req: Request): Promise<LoginInfoDto | ApiResponse> {
        const user = await  this.userService.getByEmail(data.email); 

        if (!user) {
            return new Promise(resolve => 
                resolve(new ApiResponse('error', -3001)));
        }
            const passwordHash = crypto.createHash('sha512');
            passwordHash.update(data.password);
            const passwordHashString = passwordHash.digest('hex').toUpperCase();

            if (user.passwordHash !== passwordHashString) {
                return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
            }
            const jwtData = new jwtDataDto();
            jwtData.role = 'user';
            jwtData.id = user.userId;
            jwtData.email = user.email;

            // eslint-disable-next-line prefer-const
            let sada = new Date();
            sada.setDate(sada.getDate() + 14);
            const istekDatuma = sada.getTime() / 1000;
            jwtData.exp = istekDatuma;

            jwtData.ip = req.ip.toString();
            jwtData.ua = req.headers["user-agent"];

            // eslint-disable-next-line prefer-const
            let token: string = jwt.sign(jwtData.toPlainObejt(), JwtSecret);

            const responseObject = new LoginInfoDto(
                user.userId,
                user.email,
                token
            );

                return new Promise(resolve => resolve(responseObject));
      }
}
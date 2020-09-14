import { Body, Controller, Post, Req } from "@nestjs/common"
import { loginAdministratorDto } from "src/dtos/administrator/login.administrator.dto";
import { ApiResponse } from "src/misk/api.response.class";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as crypto from 'crypto';
import { LoginInfoAdministratorDto } from "src/dtos/administrator/loginInfo.administrator.dto";
import * as jwt from 'jsonwebtoken';
import { jwtDataAdministratorDto } from "src/dtos/administrator/jwt.data.administrator.dto";
import { Request } from "express";
import { JwtSecret } from "config/jwt.secret";

@Controller('auth/')
export class AuthController {
    constructor(public administratorService: AdministratorService){ }

    @Post('login')    
    async doLogin(@Body() data: loginAdministratorDto,@Req()  req: Request): Promise<LoginInfoAdministratorDto | ApiResponse> {
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
            const jwtData = new jwtDataAdministratorDto();

            jwtData.administratorId = administrator.administratorId;
            jwtData.email = administrator.email;

            const sada = new Date();
            sada.setDate(sada.getDate() + 7);
            const istekDatuma = sada.getTime() / 1000.;
            jwtData.ext = istekDatuma;

            jwtData.ip = req.ip.toString();
            jwtData.ua = req.headers["user-agent"];

            const token: string = jwt.sign(jwtData.toPlainObejt(), JwtSecret);

            const responseObject = new LoginInfoAdministratorDto(
                administrator.administratorId,
                administrator.email,
                token
            );

                return new Promise(resolve => resolve(responseObject));
    }
}
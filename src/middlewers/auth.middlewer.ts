import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as jwt from 'jsonwebtoken';
import { jwtDataAdministratorDto } from "src/dtos/administrator/jwt.data.administrator.dto";
import { JwtSecret } from "config/jwt.secret";

@Injectable()
export class AuthMiddlewere implements NestMiddleware {
    constructor( private  administratorService: AdministratorService ) { } 

    async use(req: Request, res: Response, next: NextFunction) {
        
       if (!req.headers.authorization) {
            throw new HttpException('token not found', HttpStatus.UNAUTHORIZED);
       }

       const token = req.headers.authorization;

       const jwtData: jwtDataAdministratorDto = jwt.varify(token, JwtSecret);
       if (!jwtData){
           throw new HttpException('bad token found', HttpStatus.UNAUTHORIZED);
       }

       

       if(jwtData.ip !== req.ip.toString()){
        throw new HttpException('bad token found', HttpStatus.UNAUTHORIZED);
       }
       if(jwtData.ua !== req.headers['user-agent']) {
        throw new HttpException('bad token found', HttpStatus.UNAUTHORIZED);
       }

       const administrator = await this.administratorService.getById(jwtData.administratorId);
       if (!administrator) {
        throw new HttpException('Acaunt token found', HttpStatus.UNAUTHORIZED);
       }
       const trenutniTimestamp = new Date().getTime() / 1000;
       if ( trenutniTimestamp >= jwtData.ext ){
        throw new HttpException('the token has expire', HttpStatus.UNAUTHORIZED);
       }

       next();
    }

 }
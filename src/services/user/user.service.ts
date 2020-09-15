import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRegistrationDto } from "src/dtos/user/user.registration.dto";
import { ApiResponse } from "src/misk/api.response.class";
import * as crypto from 'crypto';

@Injectable()
export class  UserService extends TypeOrmCrudService<User> {
    constructor(@InjectRepository(User) private readonly user: Repository<User>) { 
             super(user); 
    }
    async register(data: UserRegistrationDto): Promise<User | ApiResponse>{
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        const newUser: User = new User();
        newUser.email        = data.email;
        newUser.passwordHash = passwordHashString;
        newUser.phoneNumber  = data.phoneNumber;
        newUser.firstname    = data.firstName;
        newUser.lastname     = data.lastname;

        try{
            const saveUser = await this.user.save(newUser);

            if (!saveUser){
                throw new Error('');
            }
            return saveUser;
        }catch(e){
            return new ApiResponse('error', 7001, 'ne mozete kreirati usera')
        }
    }
}
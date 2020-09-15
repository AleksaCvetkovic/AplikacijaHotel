import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from 'express';
import { Reflector } from "@nestjs/core";

@Injectable()
export class roleCheckedGuard implements CanActivate{
    constructor(private reflektor: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       const req: Request = context.switchToHttp().getRequest();
        const role = req.token.role;

        const allowedToRoles = this.reflektor.get<("administrator" | "user")[]> ('allow_to_reles', context.getHandler());

        if ( !allowedToRoles.includes(role) ){
            return false;
        }
        return true;
    }

}
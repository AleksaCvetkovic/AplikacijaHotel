export class jwtDataAdministratorDto{
    administratorId: number;
    email: string;
    exp: number;
    ip: string;
    ua: string;

    toPlainObejt(){
        return {
            administratorId: this.administratorId,
            email: this.email,
            ext: this.exp,
            ip: this.ip,
            ua: this.ua
        }
    }
}
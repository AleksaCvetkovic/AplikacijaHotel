export class jwtDataAdministratorDto{
    administratorId: number;
    email: string;
    ext: number;
    ip: string;
    ua: string;

    toPlainObejt(){
        return {
            administratorId: this.administratorId,
            email: this.email,
            ext: this.ext,
            ip: this.ip,
            ua: this.ua
        }
    }
}
export class LoginInfoAdministratorDto {
    administratorId: number;
    email: string;
    token: string;

    constructor(id: number, em: string, jwt: string){
        this.administratorId = id;
        this.email = em;
        this.token = jwt;
    }
}
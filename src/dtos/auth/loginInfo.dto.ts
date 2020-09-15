export class LoginInfoDto {
    id: number;
    email: string;
    token: string;

    constructor(id: number, em: string, jwt: string){
        this.id = id;
        this.email = em;
        this.token = jwt;
    }
}
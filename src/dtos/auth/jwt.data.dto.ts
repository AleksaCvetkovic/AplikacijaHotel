export class jwtDataDto{
    role: "administrator" | "user";
    id: number;
    email: string;
    exp: number;
    ip: string;
    ua: string;

    toPlainObejt(){
        return {
            role: this.role,
            id: this.id,
            email: this.email,
            ext: this.exp,
            ip: this.ip,
            ua: this.ua
        }
    }
}
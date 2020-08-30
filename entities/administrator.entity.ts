import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Administrator {
    @PrimaryGeneratedColumn({ name: 'administrator_id', type: 'int', unsigned: true })
    administratorID: number;

    @Column({name: 'email',  type: 'varchar', length: '128', unique: true })
    username: string;

    @Column({ name: 'password_hash', type: 'varchar', length: '255' })
    passwordHash: string;
}
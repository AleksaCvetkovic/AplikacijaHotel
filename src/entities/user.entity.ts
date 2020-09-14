import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reservation } from "./reservation.entity";

@Index("uq_user_email", ["email"], { unique: true })
@Index("uq_user_phone_number", ["phoneNumber"], { unique: true })
@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column( {type: "varchar", unique: true, length: 255 })
  email: string;

  @Column( {type: "varchar", name: "password_hash", length: 255 })
  passwordHash: string;

  @Column( {type: "varchar", length: 64 })
  firstname: string;

  @Column( {type: "varchar", length: 64 })
  lastname: string;

  @Column( {
    type: "varchar",
    name: "phone_number",
    unique: true,
    length: 24,
  })
  phoneNumber: string;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}

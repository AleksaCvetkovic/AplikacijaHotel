import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_administrator_email", ["email"], { unique: true })
@Entity("administrator")
export class Administrator {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "administrator_id",
    unsigned: true,
  })
  administratorId: number;

  @Column("varchar", { name: "email", unique: true, length: 128 })
  email: string;

  @Column("varchar", { name: "password_hash", length: 255 })
  passwordHash: string;
}
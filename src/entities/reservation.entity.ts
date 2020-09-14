import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./article.entity";
import { User } from "./user.entity";

@Index("uq_reservation_user_id_article_id", ["userId", "articleId"], {
  unique: true,
})
@Index("fk_reservation_article_id", ["articleId"], {})
@Entity("reservation")
export class Reservation {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "reservation_id",
    unsigned: true,
  })
  reservationId: number;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column( {type: "int", name: "user_id", unsigned: true})
  userId: number;

  @Column( {
    type: "enum",
    name: "status",
    enum: ["accepted", "rejected", "pending"],
    default: () => "'pending'",
  })
  status: "accepted" | "rejected" | "pending";

  @Column( {type: "int", name: "article_id", unsigned: true, default: () => "'0'" })
  articleId: number;

  @ManyToOne(() => Article, (article) => article.reservations, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
  article: Article;

  @ManyToOne(() => User, (user) => user.reservations, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}

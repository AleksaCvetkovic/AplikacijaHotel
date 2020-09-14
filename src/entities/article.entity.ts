import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Category } from "./category.entity";
import { ArticleFeature } from "./article-feature.entity";
import { ArticlePrice } from "./article-price.entity";
import { Photo } from "./photo.entity";
import { Reservation } from "./reservation.entity";
import { Feature } from "./feature.entity";

@Index("fk_article_category_id", ["categoryId"], {})
@Entity("article")
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "article_id", unsigned: true })
  articleId: number;

  @Column( {type: "varchar", name: "name", length: 128 })
  name: string;

  @Column( {type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column( {type: "varchar", length: 255 })
  except: string;

  @Column( { type: "text"})
  description: string;

  @Column( {
    type: "enum",
    enum: ["availeble", "not availeble"],
    default: () => "'availeble'",
  })
  status: "availeble" | "not availeble";

  @ManyToOne(() => Category, (category) => category.articles, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @OneToMany(() => ArticleFeature, (articleFeature) => articleFeature.article)
  articleFeatures: ArticleFeature[];

  @ManyToMany(type => Feature, feature => feature.articleFeatures)
  @JoinTable({
    name: "article_feature",
    joinColumn: { name: "article_id", referencedColumnName: "articleId" },
    inverseJoinColumn: { name: "feature_id", referencedColumnName: "featureId" }
  })
  features: Feature[];

  @OneToMany(() => ArticlePrice, (articlePrice) => articlePrice.article)
  articlePrices: ArticlePrice[];

  @OneToMany(() => Photo, (photo) => photo.article)
  photos: Photo[];

  @OneToMany(() => Reservation, (reservation) => reservation.article)
  reservations: Reservation[];
}

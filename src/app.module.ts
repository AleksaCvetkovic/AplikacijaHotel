import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/databaseConfiguration';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { ArticleFeature } from 'entities/article-feature.entity';
import { ArticlePrice } from 'entities/article-price.entity';
import { Article } from 'entities/article.entity';
import { Category } from 'entities/category.entity';
import { Feature } from 'entities/feature.entity';
import { Photo } from 'entities/photo.entity';
import { Reservation } from 'entities/reservation.entity';
import { User } from 'entities/user.entity';
import { administratorController } from './controllers/api/administrator.controller';
import { CategoryControler } from './controllers/api/category.controller';
import { CategoryService } from './services/category/category.service';
import { ArticleService } from './services/article/article.service';
import { ArticleControler } from './controllers/api/article.controller';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddlewere } from './middlewers/auth.middlewer';
import { PhotoService } from './services/Photo/photo.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [
         Administrator,
         ArticleFeature,
         ArticlePrice,
         Article,
         Category,
         Feature,
         Photo,
         Reservation,
         User,
       ]
    }),
    TypeOrmModule.forFeature([ 
      Administrator,
      ArticleFeature,
      ArticlePrice,
      Article,
      Category,
      Feature,
      Photo,
      Reservation,
      User,
    ])
  ],
  controllers: [
    AppController,
    administratorController,
    CategoryControler,
    ArticleControler,
    AuthController,
],
  providers: [
    AdministratorService,
    CategoryService,
    ArticleService,
    PhotoService,
  ],
  exports: [
    AdministratorService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddlewere)
    .exclude('auth/*')
    .forRoutes('api/*');
  }

}

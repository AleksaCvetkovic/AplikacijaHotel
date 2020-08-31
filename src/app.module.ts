import { Module } from '@nestjs/common';
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
    TypeOrmModule.forFeature([ Administrator ])
  ],
  controllers: [AppController,
  administratorController
],
  providers: [AdministratorService],
})
export class AppModule {}

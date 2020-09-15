import { Injectable } from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Article } from "src/entities/article.entity";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { ApiResponse } from "src/misk/api.response.class";
import { ArticlePrice } from "src/entities/article-price.entity";
import { ArticleFeature } from "src/entities/article-feature.entity";
import { EditArticleDto } from "src/dtos/article/edit.article.dto";

@Injectable()
export class  ArticleService extends TypeOrmCrudService<Article> {
    constructor(@InjectRepository(Article) private readonly article: Repository<Article>,
    
                @InjectRepository(ArticlePrice)
                private readonly articlePrice: Repository<ArticlePrice>,

                @InjectRepository(ArticleFeature)
                private readonly articleFeature: Repository<ArticleFeature>,
    ) { 
             super(article); 
    }

    async createFullArticle(data: AddArticleDto): Promise<Article | ApiResponse>{
        const newArticle: Article = new Article();
        newArticle.name = data.name;
        newArticle.categoryId = data.categoryId;
        newArticle.except = data.except;
        newArticle.description = data.description;

        const saveArticle = await this.article.save(newArticle);

        const newArticlePrice = new ArticlePrice();
        newArticlePrice.articleId = saveArticle.articleId;
        newArticlePrice.price = data.price;

        this.articlePrice.save(newArticlePrice);

        for( const feature of data.features) {
            const newArticleFeature: ArticleFeature = new ArticleFeature();
            newArticleFeature.articleId = saveArticle.articleId;
            newArticleFeature.featureId = feature.featureId;
            newArticleFeature.value     = feature.value;

             await this.articleFeature.save(newArticleFeature);
        
        }

        return await this.article.findOne(saveArticle.articleId, {
            relations: [
                "category",
                "articleFeatures",
                "features",
                "articlePrices"
            ]
        });
    }
    async editFullAarticle(articleId: number, data: EditArticleDto): Promise<Article | ApiResponse>{
        const postojeciArtikl : Article = await this.article.findOne(articleId, {
            relations: ['cenaArtikla', 'articleFeatures']
        });

        if(!postojeciArtikl) {
            return new ApiResponse('error', 5004, 'artikl ne postoji');
        }
        postojeciArtikl.name        = data.name;
        postojeciArtikl.categoryId  = data.categoryId;
        postojeciArtikl.description = data.description;
        postojeciArtikl.except      = data.except;
        postojeciArtikl.status      = data.status;
        
        const saveArticle = await this.article.save(postojeciArtikl);

        if (!saveArticle) {
            return new ApiResponse('error', 5001, 'nemoguce sacuvati artikl ');
        }

        const novaCena: string = Number( data.price).toFixed(2);
        const poslednjaCena = postojeciArtikl.articlePrices[postojeciArtikl.articlePrices.length-1].price;
        const poslednjaCenaString: string = Number( poslednjaCena).toFixed(2);

        if (novaCena !== poslednjaCenaString) {
                const novaCenaArtikla  = new ArticlePrice();
                novaCenaArtikla.articleId = articleId;
                novaCenaArtikla.price = data.price;

               const sakuvajNovuCenuArtikla = await this.articlePrice.save(novaCenaArtikla);
        }
        if ( data.features !== null ){
            await this.articleFeature.remove(postojeciArtikl.articleFeatures);
            for( const feature of data.features) {
                const newArticleFeature: ArticleFeature = new ArticleFeature();
                newArticleFeature.articleId = articleId;
                newArticleFeature.featureId = feature.featureId;
                newArticleFeature.value     = feature.value;
    
                 await this.articleFeature.save(newArticleFeature);
            
            }
        }
        return await this.article.findOne(articleId, {
            relations: [
                "category",
                "articleFeatures",
                "features",
                "articlePrices"
            ]
        });
    }
}
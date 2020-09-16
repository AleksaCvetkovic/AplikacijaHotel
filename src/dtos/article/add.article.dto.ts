import * as Validator from 'class-validator';
import { ArticleFeature } from 'src/entities/article-feature.entity';

export class AddArticleDto{
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(5,128)
    name: string;
    categoryId: number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(5,255)
     except: string;
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(54,12*100)
     description: string;
     @Validator.IsNotEmpty()
     @Validator.IsNumber({
       allowInfinity: false,
       allowNaN: false,
       maxDecimalPlaces: 2,
     })
     @Validator.IsPositive()
    price: number;
    features: ArticleFeature[];
}
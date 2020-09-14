import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Crud } from "@nestjsx/crud";
import { StorageConfig } from "config/storage.config";
import { Article } from "entities/article.entity";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { ArticleService } from "src/services/article/article.service";
import { diskStorage } from "multer";
import { PhotoService } from "src/services/Photo/photo.service";
import { Photo } from "entities/photo.entity";
import { ApiResponse } from "src/misk/api.response.class";


@Controller('api/article')
@Crud({
    model: {
        type: Article
    },
    params: {
        id: {
            field: 'articleId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            category:{
                eager: true
            },
            photos: {
                eager: true
            },
            articlePrices: {
                eager: true
            },
            articleFeatures: {
                eager: true
            },
            features: {
                eager: true
            },
        }
    }
})
export class ArticleControler {
    constructor(public service: ArticleService,
                public photoService: PhotoService,
                
        ){ }

    @Post('createFull')
    createFullArticle(@Body() data: AddArticleDto){
        return this.service.createFullArticle(data);
    }
    @Post(':id/uploadPhoto/')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: StorageConfig.photos,
                filename: (req, file, callback) => {
                    const original: string = file.originalname;
                    let normalized = original.replace(/\w+/g, '-');
                    normalized = normalized.replace(/[^A-z0-9\.\-]/g, '');
                    const sada = new Date();
                    let dataPart = '';
                    dataPart += sada.getFullYear().toString();
                    dataPart += (sada.getMonth() +1).toString();
                    dataPart += sada.getDate().toString();

                    const randomPart: string =
                    new Array(10)
                        .fill(0)
                        .map(e => (Math.random()*9).toFixed(0).toString())
                        .join('');

                    const fileName = dataPart + '-' + randomPart + '-' + normalized;

                    callback(null, fileName);
                }
            }),
            fileFilter: (req, file, callback) => {
                if(!file.originalname.match(/\.(jpg|png)$/)){
                    callback(new Error('Bad file extension!'), false);
                    return;
                }
                if( !file.mimetype.includes('jpeg') || file.mimetype.includes('png') ){
                    callback(new Error('Bad file content!'), false);
                    return;
                }
                callback(null,true);
            }
        })
    )
     async uploadPhoto(@Param('id') articleId: number, @UploadedFile() photo): Promise<ApiResponse | Photo> {
        const imagePath = photo.filename;

        const newPhoto: Photo = new Photo();
        newPhoto.articleId = articleId;
        newPhoto.imagePath = photo.filename;

        const savedPhoto = await this.photoService.add(newPhoto);
        if (!savedPhoto) {
            return new ApiResponse('error', -4001);
        }
        return savedPhoto;
    }
}
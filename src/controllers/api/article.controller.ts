import { Body, Controller, Delete, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Crud } from "@nestjsx/crud";
import { StorageConfig } from "config/storage.config";
import { Article } from "src/entities/article.entity";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { ArticleService } from "src/services/article/article.service";
import { diskStorage } from "multer";
import { PhotoService } from "src/services/Photo/photo.service";
import { Photo } from "src/entities/photo.entity";
import { ApiResponse } from "src/misk/api.response.class";
import * as fileType from 'file-type';
import * as fs from 'fs';
import { EditArticleDto } from "src/dtos/article/edit.article.dto";
import { roleCheckedGuard } from "src/misk/role.checked.gard";
import { AllowToRoles } from "src/misk/allow.to.reles.descriptor";


@Controller('api/article')
@Crud({
    model: {
        type: Article
    },
    params: {
        id: {
            field: 'article_id',
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
    },
    routes:{
        exclude: [ 'updateOneBase', 'replaceOneBase', 'deleteOneBase' ],
    }
})
export class ArticleControler {
    constructor(public service: ArticleService,
                public photoService: PhotoService,
                
        ){ }
        @Post('createFull')
        @UseGuards(roleCheckedGuard)
        @AllowToRoles('administrator')   
    createFullArticle(@Body() data: AddArticleDto){
        return this.service.createFullArticle(data);
    }
    @Patch(':id')
    @UseGuards(roleCheckedGuard)
    @AllowToRoles('administrator')
    editFullAsticle(@Param('id') id: number, @Body() data: EditArticleDto){
        return this.service.editFullAarticle(id,data);
    }

    @Post(':id/uploadPhoto/')
    @UseGuards(roleCheckedGuard)
    @AllowToRoles('administrator')
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
                if(!file.originalname.toLowerCase().match(/\.(jpg|png)$/)){
                    req.fileFilterError = 'Bad file extension';
                    callback(null, false);
                    return;
                }
                if( !file.mimetype.includes('jpeg') || file.mimetype.includes('png') ){
                    req.fileFilterError = 'Bad file content';
                    callback(null, false);
                    return;
                }
                callback(null,true);
            }
        })
    )
     async uploadPhoto(
         @Param('id') articleId: number,
          @UploadedFile() photo,
          @Req() req
          ): Promise<ApiResponse | Photo> {
                if (req.fileFilterError) {
                    return new ApiResponse('error', -4002, req.fileFilterError);
                }
                if(!photo){
                    return new ApiResponse('error', -4002, 'Slika nije preuzeta');
                }
                const fileTypeResoult = await fileType.fromFile(photo.path);
                if(!fileTypeResoult) {
                    fs.unlinkSync(photo.path);
                    return new ApiResponse('error', -4002, ' file nije registrovan');
                }
            
                const realMimeType = fileTypeResoult.mime;
                
                if( !realMimeType.includes('jpeg') || realMimeType.includes('png') ){
                    fs.unlinkSync(photo.path);
                    return new ApiResponse('error', -4002, ' Los tip fajla');
                }

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

    @Delete(':articleId/deletePhoto/:photoId')
    @UseGuards(roleCheckedGuard)
    @AllowToRoles('administrator')
    public async deletePhoto(
        @Param('articleId') articleId: number,
        @Param('photoId') photoId: number,
        ){
            const photo = await this.photoService.findOne({
                articleId: articleId,
                photoId: photoId
            });
            if(!photo){
                return new ApiResponse('error', -5000, 'nije nadjena fotografija');
            }

            try{
            fs.unlinkSync(StorageConfig.photo.destination + photo.imagePath);
            fs.unlinkSync(StorageConfig.photo.destination + StorageConfig.photo.resize.velike.derectory + photo.imagePath);
            fs.unlinkSync(StorageConfig.photo.destination + StorageConfig.photo.resize.male.derectory + photo.imagePath);
            }catch(e){ }
        const deleteResoult = await this.photoService.deleteByID(photoId);
            if(deleteResoult.affected == 0){
                return new ApiResponse('error', -5000, 'nije nadjena fotografija');
            }
            return new ApiResponse('ok', 0, 'obrisana fotografija');
        }
    }
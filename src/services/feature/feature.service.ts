import { Injectable } from "@nestjs/common";
import { Feature } from "src/entities/feature.entity";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class  FeatureService extends TypeOrmCrudService<Feature> {
    constructor(@InjectRepository(Feature) private readonly feature: Repository<Feature>) { 
             super(feature); 
    }
}
import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Feature } from "src/entities/feature.entity";
import { FeatureService } from "src/services/feature/feature.service";

@Controller('api/feature')
@Crud({
    model: {
        type: Feature
    },
    params: {
        id: {
            field: 'feature_id',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            articleFeatures: {
                eager: false
            },
            category: { 
                eager: true
            }
        }
    }
})
export class FeatureControler {
    constructor(public service: FeatureService){ }
}
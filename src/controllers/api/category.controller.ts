import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Category } from "src/entities/category.entity";
import { CategoryService } from "src/services/category/category.service";

@Controller('api/category')
@Crud({
    model: {
        type: Category
    },
    params: {
        id: {
            field: 'category_id',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            categories: {
                eager: false
            },
            features: { 
                eager: true
            },
            articles: {
                eager: false
            }
        }
    }
})
export class CategoryControler {
    constructor(public service: CategoryService){ }
}
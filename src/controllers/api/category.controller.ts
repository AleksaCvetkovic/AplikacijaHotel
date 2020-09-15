import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Category } from "src/entities/category.entity";
import { AllowToRoles } from "src/misk/allow.to.reles.descriptor";
import { roleCheckedGuard } from "src/misk/role.checked.gard";
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
    },
    routes: {
        only: [
            "createOneBase",
            "createManyBase",
            "getManyBase",
            "getOneBase",
            "updateOneBase",
        ],
        createOneBase: {
            decorators: [
                UseGuards(roleCheckedGuard),
                AllowToRoles('administrator'),
            ],
        },
        createManyBase: {
            decorators: [
                UseGuards(roleCheckedGuard),
                AllowToRoles('administrator'),
            ],
        },
        getManyBase: {
            decorators: [
                UseGuards(roleCheckedGuard),
                AllowToRoles('administrator', 'user'),
            ],
        },
        getOneBase: {
            decorators: [
                UseGuards(roleCheckedGuard),
                AllowToRoles('administrator','user'),
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(roleCheckedGuard),
                AllowToRoles('administrator'),
            ],
        }
    },
})
export class CategoryControler {
    constructor(public service: CategoryService){ }
}
import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Feature } from "src/entities/feature.entity";
import { AllowToRoles } from "src/misk/allow.to.reles.descriptor";
import { roleCheckedGuard } from "src/misk/role.checked.gard";
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
export class FeatureControler {
    constructor(public service: FeatureService){ }
}
import { Controller, Get, Param, Put, Body, Post, SetMetadata, UseGuards, Patch } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { Administrator } from "src/entities/administrator.entity";
import { addAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { editAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { ApiResponse } from "src/misk/api.response.class";
import { AllowToRoles } from "src/misk/allow.to.reles.descriptor";
import { roleCheckedGuard } from "src/misk/role.checked.gard";

@Controller('api/administrator')
export class administratorController {
    constructor(
        private administratorService: AdministratorService
    ){ }

    @Get()
    @UseGuards(roleCheckedGuard)
    @AllowToRoles('administrator')
    getAll(): Promise<Administrator[]>{
      return this.administratorService.getAll();
    }
    @Get(':id/')
    @UseGuards(roleCheckedGuard)
    @AllowToRoles('administrator')
    getbyid( @Param('id') administratorId: number): Promise<Administrator | ApiResponse>{
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return new Promise(async (resolve) => {
      const admin = await this.administratorService.getById(administratorId);
        if(admin === undefined){
          resolve(new ApiResponse("error", -1002));
        }
        resolve(admin);
      });
    }
    @Put()
    @UseGuards(roleCheckedGuard)
    @AllowToRoles('administrator')
    add( @Body() data: addAdministratorDto ): Promise<Administrator | ApiResponse>{
        return this.administratorService.add(data);
    }
    @Patch(':id')
    @UseGuards(roleCheckedGuard)
    @AllowToRoles('administrator')
    edit(@Param('id') id: number, @Body() data: editAdministratorDto): Promise<Administrator | ApiResponse>{
        return this.administratorService.editById(id, data);
    }
}
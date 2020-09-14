import { Controller, Get, Param, Put, Body, Post } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { Administrator } from "src/entities/administrator.entity";
import { addAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { editAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { ApiResponse } from "src/misk/api.response.class";

@Controller('api/administrator')
export class administratorController {
    constructor(
        private administratorService: AdministratorService
    ){ }

    @Get()
    getAll(): Promise<Administrator[]>{
      return this.administratorService.getAll();
    }
    @Get(':id/')
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
    add( @Body() data: addAdministratorDto ): Promise<Administrator | ApiResponse>{
        return this.administratorService.add(data);
    }
    @Post(':id')
    edit(@Param('id') id: number, @Body() data: editAdministratorDto): Promise<Administrator | ApiResponse>{
        return this.administratorService.editById(id, data);
    }
}
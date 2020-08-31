import { Controller, Get, Param, Put, Body, Post } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { Administrator } from "entities/administrator.entity";
import { addAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { editAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";

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
    getbyid( @Param('id') administratorId: number): Promise<Administrator>{
      return this.administratorService.getById(administratorId);
    }
    @Put()
    add( @Body() data: addAdministratorDto ): Promise<Administrator>{
        return this.administratorService.add(data);
    }
    @Post(':id')
    edit(@Param('id') id: number, @Body() data: editAdministratorDto): Promise<Administrator>{
        return this.administratorService.editById(id, data);
    }
}
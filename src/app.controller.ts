import { Controller, Get } from '@nestjs/common';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';

@Controller()
export class AppController {
    constructor(
      private administratorServise: AdministratorService
    ){ }
  @Get()
  getIndex(): string {
    return ' home page';
  }
  @Get('api/administrator')
  getAllAdmins(): Promise<Administrator[]>{
    return this.administratorServise.getAll();
  }
}

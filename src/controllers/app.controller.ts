import { Controller, Get } from '@nestjs/common';
import { AdministratorService } from '../services/administrator/administrator.service';

@Controller()
export class AppController {
    constructor(
      private administratorServise: AdministratorService
    ){ }
  @Get()
  getIndex(): string {
    return ' home page';
  }

}

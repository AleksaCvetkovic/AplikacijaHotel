import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'hello world';
  }
  
  @Get('world')
  getWorld(): string {
    return ' World!!';
  }
}

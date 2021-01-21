import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get()
  getStatus(): { status: string } {
    return { status: 'Running' };
  }
}

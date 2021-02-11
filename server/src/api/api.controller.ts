import { Controller, Get } from '@nestjs/common';
import { Public } from '../exports/public';

@Controller('api')
export class ApiController {
  @Public()
  @Get()
  getStatus(): { status: string } {
    return { status: 'Running' };
  }
}

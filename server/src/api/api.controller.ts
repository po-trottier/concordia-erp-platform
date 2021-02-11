import { Controller, Get } from '@nestjs/common';
import { Public } from '../exports/Public';

@Controller('api')
export class ApiController {
  @Public()
  @Get()
  getStatus(): { status: string } {
    return { status: 'Running' };
  }
}

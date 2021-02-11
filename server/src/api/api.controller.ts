import { Controller, Get } from '@nestjs/common';
import { Public } from '../shared/public';

@Controller('api')
export class ApiController {
  @Public()
  @Get()
  getStatus(): { status: string } {
    return { status: 'Running' };
  }
}

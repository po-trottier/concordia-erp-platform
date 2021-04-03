import { Controller, Get } from '@nestjs/common';
import { Public } from '../shared/public';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Public()
  @Get()
  getStatus() {
    return this.apiService.getStatus();
  }
}

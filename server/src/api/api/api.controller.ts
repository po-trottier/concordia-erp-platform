import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Public } from '../../shared/public';
import { ApiService } from './api.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Public()
  @Get()
  getStatus() {
    return this.apiService.getStatus();
  }

  @Public()
  @Post('/mail')
  testEmail(@Body(ValidationPipe) dto: SendEmailDto) {
    return this.apiService.testEmail(dto);
  }
}

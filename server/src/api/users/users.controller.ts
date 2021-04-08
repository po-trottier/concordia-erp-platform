import {
  Body,
  Headers,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(@Headers('authorization') auth: string, @Body(ValidationPipe) dto: CreateUserDto) {
    const body = dto;
    body.username = body.username.trim().toLowerCase();
    body.email = body.email.trim().toLowerCase();
    return this.usersService.create(auth, body);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username.trim().toLowerCase());
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Patch(':username')
  async update(
    @Headers('authorization') auth: string,
    @Param('username') username: string,
    @Body(ValidationPipe) dto: UpdateUserDto,
  ) {
    return this.usersService.update(auth, username.trim().toLowerCase(), dto);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Delete(':username')
  remove(@Headers('authorization') auth: string, @Param('username') username: string) {
    return this.usersService.remove(auth, username.trim().toLowerCase());
  }
}

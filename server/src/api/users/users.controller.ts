import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { hash } from 'bcryptjs';
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
  create(@Body(ValidationPipe) dto: CreateUserDto) {
    const body = dto;
    body.username = body.username.trim().toLowerCase();
    body.email = body.email.trim().toLowerCase();
    return this.usersService.create(body);
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
    @Param('username') username: string,
    @Body(ValidationPipe) dto: UpdateUserDto,
  ) {
    const body = dto;
    if (body.username) {
      body.username = body.username.trim().toLowerCase();
    }
    if (body.email) {
      body.email = body.email.trim().toLowerCase();
    }
    if (body.password) {
      body.password = await hash(body.password, 16);
    }
    return this.usersService.update(username.trim().toLowerCase(), body);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.usersService.remove(username.trim().toLowerCase());
  }
}

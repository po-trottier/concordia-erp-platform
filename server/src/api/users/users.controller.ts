import {
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Controller,
  Param,
  ValidationPipe,
  ConflictException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
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
  async create(@Body(ValidationPipe) dto: CreateUserDto) {
    const body = dto;
    body.password = await hash(dto.password, 16);
    const user = await this.usersService.create(body);
    if (user === undefined) {
      return new ConflictException('User already exists');
    }
    return user;
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Patch(':username')
  async update(
    @Param('username') username: string,
    @Body(ValidationPipe) dto: UpdateUserDto,
  ) {
    if (!dto.password) {
      return this.usersService.update(username, dto);
    }
    const body = dto;
    body.password = await hash(dto.password, 16);
    return this.usersService.update(username, body);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}

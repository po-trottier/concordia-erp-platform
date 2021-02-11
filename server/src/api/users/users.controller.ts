import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post, UnauthorizedException,
  ValidationPipe
} from "@nestjs/common";
import { hash } from 'bcrypt';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly partsService: UsersService) {}

  @Post()
  async create(@Body(ValidationPipe) dto: CreateUserDto) {
    const body = dto;
    body.password = await hash(dto.password, 16);
    const user = await this.partsService.create(body);
    if (user === undefined) {
      return new UnauthorizedException('User already exists');
    }
    return user;
  }

  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.partsService.findOne(username);
  }

  @Patch(':username')
  async update(
    @Param('username') username: string,
    @Body(ValidationPipe) dto: UpdateUserDto,
  ) {
    if (!dto.password) {
      return this.partsService.update(username, dto);
    }
    const body = dto;
    body.password = await hash(dto.password, 16);
    return this.partsService.update(username, body);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.partsService.remove(username);
  }
}

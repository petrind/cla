import { Response } from 'express';
import { Readable } from 'stream';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUserInfo(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Get('/by-email/:email')
  async getUserInfoByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.getUserByemail(email);
  }

  @Post('/register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.registerUser(createUserDto);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    return this.userService.deleteUser(id);
  }
}

import { Response } from 'express';
import { Readable } from 'stream';

import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUserInfo(@Param('id') id: string): Promise<User> {
    return new User();
  }
}

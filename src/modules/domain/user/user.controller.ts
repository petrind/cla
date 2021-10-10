import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from '@entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiGoneResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: 'Route to get a user by id.',
  })
  @ApiOkResponse({
    description: 'User',
    type: User,
  })
  @Get('/:id')
  async getUserInfo(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @ApiOperation({
    description: 'Route to get a user by email.',
  })
  @ApiOkResponse({
    description: 'User',
    type: User,
  })
  @Get('/by-email/:email')
  async getUserInfoByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.getUserByemail(email);
  }

  @ApiOperation({
    description: 'Route to register a user.',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiCreatedResponse({
    description: 'User',
    type: User,
  })
  @Post('/register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.registerUser(createUserDto);
  }

  @ApiOperation({
    description: 'Route to update a user.',
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiOkResponse({
    description: 'User',
    type: User,
  })
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiOperation({
    description: 'Route to delete a user.',
  })
  @ApiGoneResponse({
    description: 'User id',
    type: String,
  })
  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    return this.userService.deleteUser(id);
  }
}

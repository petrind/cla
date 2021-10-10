import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async getUser(id: string): Promise<User> {
    return this.repo.findOne(id);
  }

  async getUserByemail(email: string): Promise<User> {
    return this.repo.findOne({ email: email });
  }

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    return this.repo.save(createUserDto);
  }

  async updateUser(id: string, updateUserDto: CreateUserDto): Promise<User> {
    return this.repo.save({ ...updateUserDto, id });
  }

  async deleteUser(id: string): Promise<string> {
    await this.repo.delete(id);
    return id;
  }
}

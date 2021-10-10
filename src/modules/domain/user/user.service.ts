import { BadRequestException, Injectable } from '@nestjs/common';
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
    const user = await this.repo.findOne(id);
    if (user) {
      throw new BadRequestException('contact not found');
    }

    return user;
  }

  async getUserByemail(email: string): Promise<User> {
    const user = await this.repo.findOne({ email: email });
    if (user) {
      throw new BadRequestException('contact not found');
    }

    return user;
  }

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    return this.repo.save(createUserDto);
  }

  async updateUser(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.repo.findOne(id);
    if (user) {
      throw new BadRequestException('contact not found');
    }

    return this.repo.save({ ...updateUserDto, id });
  }

  async deleteUser(id: string): Promise<string> {
    const user = await this.repo.findOne(id);
    if (user) {
      throw new BadRequestException('contact not found');
    }

    await this.repo.delete(id);
    return id;
  }
}

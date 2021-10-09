import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ContactList } from 'src/entities/contact-list.entity';
import { Contact } from 'src/entities/contact.entity';
import { User } from 'src/entities/user.entity';
import { Connection, Repository } from 'typeorm';
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

import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ContactList } from 'src/entities/contact-list.entity';
import { Contact } from 'src/entities/contact.entity';
import { User } from 'src/entities/user.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  // register
  // change password
}

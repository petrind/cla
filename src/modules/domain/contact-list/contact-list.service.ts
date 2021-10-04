import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ContactList } from 'src/entities/contact-list.entity';
import { Contact } from 'src/entities/contact.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class ContactListService {
  constructor(
    @InjectRepository(ContactList)
    private readonly repo: Repository<ContactList>,
  ) {}

  // getContactList
  // createContactList
  // deleteContactList
  // updateContactList
}

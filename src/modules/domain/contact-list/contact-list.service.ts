import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactList } from 'src/entities/contact-list.entity';
import { Repository } from 'typeorm';
import { CreateContacListDto } from './dto/create-contact-list.dto';
import { UpdateContactListDto } from './dto/update-contact-list.dto';

@Injectable()
export class ContactListService {
  constructor(
    @InjectRepository(ContactList)
    private readonly repo: Repository<ContactList>,
  ) {}

  async getContactList(id: string): Promise<ContactList> {
    return this.repo.findOne(id);
  }

  async getContactListsByUser(userId: string): Promise<ContactList[]> {
    return this.repo.find({ userId });
  }

  async createContactList(
    createContactListDto: CreateContacListDto,
  ): Promise<ContactList> {
    return this.repo.save(createContactListDto);
  }

  async addContactToContactList(
    contactId: string,
    contactListId: string,
  ): Promise<string> {
    return 'a';
  }

  async updateContactList(
    id: string,
    updateContactListDto: UpdateContactListDto,
  ): Promise<ContactList> {
    return this.repo.save({ ...updateContactListDto, id });
  }

  async deleteContactList(id: string): Promise<string> {
    await this.repo.delete(id);
    return id;
  }
}

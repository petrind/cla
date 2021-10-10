import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactList } from '@entities/contact-list.entity';
import { In, Repository } from 'typeorm';
import { CreateContacListDto } from './dto/create-contact-list.dto';
import { UpdateContactListDto } from './dto/update-contact-list.dto';
import { Contact } from '@entities/contact.entity';

@Injectable()
export class ContactListService {
  constructor(
    @InjectRepository(ContactList)
    private readonly repo: Repository<ContactList>,
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
  ) {}

  async getContactList(id: string): Promise<ContactList> {
    return this.repo.findOne(id, { relations: ['contacts'] });
  }

  async getContactListsByUser(userId: string): Promise<ContactList[]> {
    return this.repo.find({ userId });
  }

  async createContactList(
    createContactListDto: CreateContacListDto,
  ): Promise<ContactList> {
    return this.repo.save(createContactListDto);
  }

  async getContactsInContactList(contactListId: string): Promise<Contact[]> {
    const contactList = await this.repo.findOne(contactListId, {
      relations: ['contacts'],
    });
    return contactList.contacts;
  }

  async updateContactList(
    id: string,
    updateContactListDto: UpdateContactListDto,
  ): Promise<ContactList> {
    return this.repo.save({ ...updateContactListDto, id });
  }

  async addContactsToContactList(
    contactIds: string[],
    contactListId: string,
  ): Promise<string> {
    const contactsToAdd = await this.contactRepo.find({ id: In(contactIds) });
    console.log(contactsToAdd);
    const contactList = await this.repo.findOne(contactListId, {
      relations: ['contacts'],
    });
    contactList.contacts = contactList.contacts.concat(contactsToAdd);
    console.log(contactList.contacts);

    await this.repo.save(contactList);
    return contactList.id;
  }

  async removeContactsFromContactList(
    contactIds: string[],
    contactListId: string,
  ): Promise<string> {
    const contactList = await this.repo.findOne(contactListId, {
      relations: ['contacts'],
    });
    contactList.contacts.filter((contact) => !contactIds.includes(contact.id));
    await this.repo.save(contactList);
    return contactList.id;
  }

  async deleteContactList(id: string): Promise<string> {
    await this.repo.delete(id);
    return id;
  }
}

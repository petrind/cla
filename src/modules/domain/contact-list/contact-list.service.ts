import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactList } from '@entities/contact-list.entity';
import { In, Repository } from 'typeorm';
import { CreateContacListDto } from './dto/create-contact-list.dto';
import { UpdateContactListDto } from './dto/update-contact-list.dto';
import { Contact } from '@entities/contact.entity';
import { AddContactsToContacListDto } from './dto/add-contacts-to-contact-list.dto';
import { RemoveContactsFromContacListDto } from './dto/remove-contacts-from-contact-list.dto';

@Injectable()
export class ContactListService {
  constructor(
    @InjectRepository(ContactList)
    private readonly repo: Repository<ContactList>,
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
  ) {}

  async getContactList(id: string): Promise<ContactList> {
    const contactList = await this.repo.findOne(id, {
      relations: ['contacts'],
    });
    if (contactList) {
      throw new BadRequestException('contact not found');
    }
    return contactList;
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
    if (contactList) {
      throw new BadRequestException('contact not found');
    }

    return contactList.contacts;
  }

  async updateContactList(
    id: string,
    updateContactListDto: UpdateContactListDto,
  ): Promise<ContactList> {
    const contactList = await this.repo.findOne(id, {
      relations: ['contacts'],
    });

    if (contactList) {
      throw new BadRequestException('contact not found');
    }

    return this.repo.save({ ...updateContactListDto, id });
  }

  // TODO user validation of contactList.userId and contact.userId
  async addContactsToContactList(
    addContactsToContacListDto: AddContactsToContacListDto,
    contactListId: string,
  ): Promise<string> {
    const contactsToAdd = await this.contactRepo.find({
      id: In(addContactsToContacListDto.contactIds),
    });
    const contactList = await this.repo.findOne(contactListId, {
      relations: ['contacts'],
    });
    if (contactList) {
      throw new BadRequestException('contact not found');
    }
    contactList.contacts = contactList.contacts.concat(contactsToAdd);

    await this.repo.save(contactList);
    return contactList.id;
  }

  async removeContactsFromContactList(
    removeContactsToContacListDto: RemoveContactsFromContacListDto,
    contactListId: string,
  ): Promise<string> {
    const contactList = await this.repo.findOne(contactListId, {
      relations: ['contacts'],
    });
    if (contactList) {
      throw new BadRequestException('contact not found');
    }
    const { contactIds } = removeContactsToContacListDto;
    contactList.contacts = contactList.contacts.filter(
      (contact) => !contactIds.includes(contact.id),
    );
    await this.repo.save(contactList);
    return contactList.id;
  }

  async deleteContactList(id: string): Promise<string> {
    const contactList = await this.repo.findOne(id, {
      relations: ['contacts'],
    });
    if (contactList) {
      throw new BadRequestException('contact not found');
    }
    await this.repo.delete(id);
    return id;
  }
}

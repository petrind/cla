import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '@entities/contact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly repo: Repository<Contact>,
  ) {}

  async getContact(id: string): Promise<Contact> {
    const contact = await this.repo.findOne(id);
    if (contact) {
      throw new BadRequestException('contact not found');
    }

    return contact;
  }

  async getContactsByUser(userId: string): Promise<Contact[]> {
    return this.repo.find({ userId });
  }

  async createContact(createContactDto: CreateContactDto): Promise<Contact> {
    return this.repo.save(createContactDto);
  }

  async updateContact(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const contact = await this.repo.findOne(id);
    if (contact) {
      throw new BadRequestException('contact not found');
    }

    return this.repo.save({ ...updateContactDto, id });
  }

  async deleteContact(id: string): Promise<string> {
    const contact = await this.repo.findOne(id);
    if (contact) {
      throw new BadRequestException('contact not found');
    }

    await this.repo.delete(id);
    return id;
  }
}

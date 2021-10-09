import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { ContactService } from './contact.service';
import { Contact } from 'src/entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('api/v1/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('/:id')
  async getContact(@Param('id') id: string): Promise<Contact> {
    return this.contactService.getContact(id);
  }

  @Get('/by-user/:userId')
  async getContactsByUser(@Param('userId') userId: string): Promise<Contact[]> {
    return this.contactService.getContactByUser(userId);
  }

  @Post('/add-contact')
  async createUser(
    @Body() createContactDto: CreateContactDto,
  ): Promise<Contact> {
    return this.contactService.createContact(createContactDto);
  }

  @Put('/:id')
  async updateContact(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    return this.contactService.updateContact(id, updateContactDto);
  }

  @Delete('/:id')
  async deleteContact(@Param('id') id: string): Promise<string> {
    return this.contactService.deleteContact(id);
  }
}

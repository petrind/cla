import { Contact } from '@entities/contact.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiGoneResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('api/v1/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({
    description: 'Route to get a contact by id.',
  })
  @ApiOkResponse({
    description: 'Contact',
    type: Contact,
  })
  @Get('/:id')
  async getContact(@Param('id') id: string): Promise<Contact> {
    return this.contactService.getContact(id);
  }

  @ApiOperation({
    description: 'Route to get contacts of user by userId.',
  })
  @ApiOkResponse({
    description: 'Contacts',
    type: [Contact],
  })
  @Get('/by-user/:userId')
  async getContactsByUser(@Param('userId') userId: string): Promise<Contact[]> {
    return this.contactService.getContactsByUser(userId);
  }

  @ApiOperation({
    description: 'Route to add a contact.',
  })
  @ApiBody({
    type: CreateContactDto,
  })
  @ApiCreatedResponse({
    description: 'Contact',
    type: Contact,
  })
  @Post('/add-contact')
  async createContact(
    @Body() createContactDto: CreateContactDto,
  ): Promise<Contact> {
    return this.contactService.createContact(createContactDto);
  }

  @ApiOperation({
    description: 'Route to update a contact.',
  })
  @ApiBody({
    type: UpdateContactDto,
  })
  @ApiOkResponse({
    description: 'Contact',
    type: Contact,
  })
  @Put('/:id')
  async updateContact(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    return this.contactService.updateContact(id, updateContactDto);
  }

  @ApiOperation({
    description: 'Route to delete a contact.',
  })
  @ApiGoneResponse({
    description: 'Contact id',
    type: String,
  })
  @Delete('/:id')
  async deleteContact(@Param('id') id: string): Promise<string> {
    return this.contactService.deleteContact(id);
  }
}

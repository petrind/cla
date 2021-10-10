import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ContactListService } from './contact-list.service';
import { ContactList } from '@entities/contact-list.entity';
import { CreateContacListDto } from './dto/create-contact-list.dto';
import { UpdateContactListDto } from './dto/update-contact-list.dto';
import { AddContactsToContacListDto } from './dto/add-contacts-to-contact-list.dto';
import { RemoveContactsFromContacListDto } from './dto/remove-contacts-from-contact-list.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiGoneResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('api/v1/contact-list')
export class ContactListController {
  constructor(private readonly contacListService: ContactListService) {}

  @ApiOperation({
    description: 'Route to get a contact list by id.',
  })
  @ApiOkResponse({
    description: 'Contact',
    type: ContactList,
  })
  @Get('/:id')
  async getContact(@Param('id') id: string): Promise<ContactList> {
    return this.contacListService.getContactList(id);
  }

  @ApiOperation({
    description: 'Route to get contact lists of user by userId.',
  })
  @ApiOkResponse({
    description: 'Contacts',
    type: [ContactList],
  })
  @Get('/by-user/:userId')
  async getContactListByUser(
    @Param('userId') userId: string,
  ): Promise<ContactList[]> {
    return this.contacListService.getContactListsByUser(userId);
  }

  @ApiOperation({
    description: 'Route to create a contact list.',
  })
  @ApiBody({
    type: CreateContacListDto,
  })
  @ApiCreatedResponse({
    description: 'Contact',
    type: ContactList,
  })
  @Post('/create-contact-list')
  async createContactList(
    @Body() createContactlistDto: CreateContacListDto,
  ): Promise<ContactList> {
    return this.contacListService.createContactList(createContactlistDto);
  }

  @ApiOperation({
    description: 'Route to update a contact.',
  })
  @ApiBody({
    type: UpdateContactListDto,
  })
  @ApiOkResponse({
    description: 'Contact',
    type: ContactList,
  })
  @Put('/:id')
  async updateContactList(
    @Param('id') id: string,
    @Body() updateContactListDto: UpdateContactListDto,
  ): Promise<ContactList> {
    return this.contacListService.updateContactList(id, updateContactListDto);
  }

  @ApiOperation({
    description: 'Route to add a contact to a contact list.',
  })
  @ApiBody({
    type: AddContactsToContacListDto,
  })
  @ApiOkResponse({
    description: 'Contact List Id',
    type: String,
  })
  @Put('/add-contacts-to-contact-list/:contactListId')
  async addContactToContactList(
    @Param('contactListId') contactListId: string,
    @Body() createContactlistDto: AddContactsToContacListDto,
  ): Promise<string> {
    return this.contacListService.addContactsToContactList(
      createContactlistDto,
      contactListId,
    );
  }

  @ApiOperation({
    description: 'Route to remove a contact from a contact list.',
  })
  @ApiBody({
    type: RemoveContactsFromContacListDto,
  })
  @ApiOkResponse({
    description: 'Contact List Id',
    type: String,
  })
  @Put('/remove-contacts-from-contact-list/:contactListId')
  async removeContactToContactList(
    @Param('contactListId') contactListId: string,
    @Body() createContactlistDto: RemoveContactsFromContacListDto,
  ): Promise<string> {
    return this.contacListService.removeContactsFromContactList(
      createContactlistDto,
      contactListId,
    );
  }

  @ApiOperation({
    description: 'Route to delete a contact list.',
  })
  @ApiGoneResponse({
    description: 'Contact list id',
    type: String,
  })
  @Delete('/:id')
  async deleteContact(@Param('id') id: string): Promise<string> {
    return this.contacListService.deleteContactList(id);
  }
}

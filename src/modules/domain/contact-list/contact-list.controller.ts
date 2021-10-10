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

@Controller('api/v1/contact-list')
export class ContactListController {
  constructor(private readonly contacListService: ContactListService) {}

  @Get('/:id')
  async getContact(@Param('id') id: string): Promise<ContactList> {
    return this.contacListService.getContactList(id);
  }

  @Get('/by-user/:userId')
  async getContactListByUser(
    @Param('userId') userId: string,
  ): Promise<ContactList[]> {
    return this.contacListService.getContactListsByUser(userId);
  }

  @Post('/create-contact-list')
  async createContactList(
    @Body() createContactlistDto: CreateContacListDto,
  ): Promise<ContactList> {
    return this.contacListService.createContactList(createContactlistDto);
  }

  @Put('/:id')
  async updateContactList(
    @Param('id') id: string,
    @Body() updateContactListDto: UpdateContactListDto,
  ): Promise<ContactList> {
    return this.contacListService.updateContactList(id, updateContactListDto);
  }

  @Put('/add-contacts-to-contact-list/:contactListId')
  async addContactToContactList(
    @Param('contactListId') contactListId: string,
    @Body() createContactlistDto: AddContactsToContacListDto,
  ): Promise<string> {
    return this.contacListService.addContactsToContactList(
      createContactlistDto.contactIds,
      contactListId,
    );
  }

  @Put('/remove-contacts-from-contact-list/:contactListId')
  async removeContactToContactList(
    @Param('contactListId') contactListId: string,
    @Body() createContactlistDto: RemoveContactsFromContacListDto,
  ): Promise<string> {
    return this.contacListService.removeContactsFromContactList(
      createContactlistDto.contactIds,
      contactListId,
    );
  }

  @Delete('/:id')
  async deleteContact(@Param('id') id: string): Promise<string> {
    return this.contacListService.deleteContactList(id);
  }
}

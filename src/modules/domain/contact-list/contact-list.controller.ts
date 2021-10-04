import { Response } from 'express';
import { Readable } from 'stream';

import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';

import { ContactListService } from './contact-list.service';
import { ContactList } from 'src/entities/contact-list.entity';

@Controller('api/v1/contact-list')
export class ContactListController {
  constructor(private readonly contacListService: ContactListService) {}

  @Get('/by-user/:id')
  async getContactLists(@Param('id') id: string): Promise<ContactList[]> {
    return [];
  }
}

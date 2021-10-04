import { Response } from 'express';
import { Readable } from 'stream';

import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';

import { ContactList } from 'src/entities/contact-list.entity';
import { ContactService } from './contact.service';

@Controller('api/v1/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('/:id')
  async getContacts(@Param('id') id: string): Promise<ContactList[]> {
    return [];
  }
}

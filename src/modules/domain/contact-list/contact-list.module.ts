import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactList } from '@entities/contact-list.entity';
import { ContactListController } from './contact-list.controller';
import { ContactListService } from './contact-list.service';
import { Contact } from '@entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactList, Contact])],
  providers: [ContactListService],
  controllers: [ContactListController],
  exports: [ContactListService],
})
export class ContactListModule {}

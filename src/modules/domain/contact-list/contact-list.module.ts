import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactList } from 'src/entities/contact-list.entity';
import { Contact } from 'src/entities/contact.entity';
import { ContactListController } from './contact-list.controller';
import { ContactListService } from './contact-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactList, Contact])],
  providers: [ContactListService],
  controllers: [ContactListController],
  exports: [ContactListService],
})
export class ContactListModule {}

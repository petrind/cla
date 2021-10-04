import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactList } from 'src/entities/contact-list.entity';
import { ContactListController } from './contact-list.controller';
import { ContactListService } from './contact-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactList])],
  providers: [ContactListService],
  controllers: [ContactListController],
  exports: [ContactListService],
})
export class UserModule {}

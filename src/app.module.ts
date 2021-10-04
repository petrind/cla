import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactListModule } from './modules/domain/contact-list/contact-list.module';
import { ContactModule } from './modules/domain/contact/contact.module';
import { UserModule } from './modules/domain/user/user.module';
import * as config from 'config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.get('db')),
    ContactListModule,
    ContactModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { PickType } from '@nestjs/swagger';
import { Contact } from 'src/entities/contact.entity';

export class CreateContactDto extends PickType(Contact, [
  'name',
  'email',
  'phoneNumber',
  'userId',
]) {}

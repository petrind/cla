import { PickType } from '@nestjs/swagger';
import { ContactList } from '@entities/contact-list.entity';

export class CreateContacListDto extends PickType(ContactList, [
  'name',
  'userId',
]) {}

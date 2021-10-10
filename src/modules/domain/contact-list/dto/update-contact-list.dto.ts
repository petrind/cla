import { ContactList } from '@entities/contact-list.entity';
import { PickType } from '@nestjs/swagger';

export class UpdateContactListDto extends PickType(ContactList, ['name']) {}

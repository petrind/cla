import { Contact } from '@entities/contact.entity';
import { PartialType, PickType } from '@nestjs/swagger';

export class UpdateContactDto extends PartialType(
  PickType(Contact, ['name', 'email', 'phoneNumber']),
) {}

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ContactList } from './contact-list.entity';
import { Contact } from './contact.entity';

@Entity()
export class User extends BaseEntity {
  @Index()
  @Column()
  name: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @OneToMany(() => Contact, (contact) => contact.user, {
    cascade: true,
  })
  contacts: Contact[];

  @OneToMany(() => ContactList, (contactList) => contactList.user, {
    cascade: true,
  })
  contactLists: ContactList[];

  @BeforeInsert()
  @BeforeUpdate()
  lowercaseEmail(): void {
    this.email = this.email.toLowerCase();
  }
}

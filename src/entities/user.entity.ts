import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
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

  @Index()
  @Column({ nullable: true })
  phoneNumber?: string;

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];

  @OneToMany(() => ContactList, (contactList) => contactList.user)
  contactLists: ContactList[];

  @BeforeInsert()
  @BeforeUpdate()
  lowercaseEmail(): void {
    this.email = this.email.toLowerCase();
  }
}

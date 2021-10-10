import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Contact } from './contact.entity';
import { User } from './user.entity';

@Entity()
export class ContactList extends BaseEntity {
  @Index()
  @Column()
  userId: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.contacts, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Index()
  @Column()
  name: string;

  @ManyToMany(() => Contact, (contact) => contact.contactLists, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  contacts: Contact[];
}

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ContactList } from './contact-list.entity';
import { User } from './user.entity';

@Entity()
export class Contact extends BaseEntity {
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

  @Index({ unique: true })
  @Column({ nullable: true })
  email?: string;

  @Index()
  @Column({ nullable: true })
  phoneNumber?: string;

  @ManyToMany(() => ContactList, (contactList) => contactList.contacts, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'contact_to_contact_list',
    joinColumn: {
      name: 'contactId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'contactListId',
      referencedColumnName: 'id',
    },
  })
  contactLists?: ContactList[];

  @BeforeInsert()
  @BeforeUpdate()
  lowercaseEmail(): void {
    this.email = this.email.toLowerCase();
  }
}

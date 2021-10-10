import * as config from 'config';
import { getConnection, Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ContactListService } from '../contact-list.service';
import { ContactList } from '@entities/contact-list.entity';
import { User } from '@entities/user.entity';
import { Contact } from '@entities/contact.entity';
import { CreateContacListDto } from '../dto/create-contact-list.dto';
import { UpdateContactListDto } from '../dto/update-contact-list.dto';
import { AddContactsToContacListDto } from '../dto/add-contacts-to-contact-list.dto';
import { RemoveContactsFromContacListDto } from '../dto/remove-contacts-from-contact-list.dto';

describe(ContactListService.name, () => {
  let module: TestingModule;
  let contactListRepo: Repository<ContactList>;
  let contactRepo: Repository<Contact>;
  let userRepo: Repository<User>;
  let contactlistService: ContactListService;

  let userForTest: User;
  let contactForTest: Contact;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.get('db')),
        TypeOrmModule.forFeature([ContactList, Contact, User]),
      ],
      providers: [ContactListService],
    }).compile();

    contactListRepo = module.get(getRepositoryToken(ContactList));
    userRepo = module.get(getRepositoryToken(User));
    contactRepo = module.get(getRepositoryToken(Contact));

    contactlistService = module.get(ContactListService);

    const newUser = Object.assign(new User(), {
      name: 'test user',
      email: 'test-user@example.com',
    });
    userForTest = await userRepo.save(newUser);

    const newContact = Object.assign(new Contact(), {
      name: 'test contact',
      email: 'test-contact@example.com',
      userId: userForTest.id,
    });
    contactForTest = await contactRepo.save(newContact);
  });

  afterAll(async () => {
    await getConnection().synchronize(true);
    module.close();
  });

  describe('createContactList', () => {
    it('create contact list correctly', async () => {
      const createContactListDto: CreateContacListDto = {
        name: 'test contact list',
        userId: userForTest.id,
      };
      const createdContactList = await contactlistService.createContactList(
        createContactListDto,
      );
      const contactListFromDb = await contactListRepo.findOne(
        createdContactList.id,
      );
      expect(contactListFromDb.name).toEqual(createContactListDto.name);
      expect(contactListFromDb.userId).toBe(userForTest.id);
    });
  });

  describe('getContactList', () => {
    it('get contact list correctly', async () => {
      const contactListFromDb = await contactListRepo.findOne();
      const getContactList = await contactlistService.getContactList(
        contactListFromDb.id,
      );
      expect(contactListFromDb.name).toEqual(getContactList.name);
    });
  });

  describe('getContactListsByUser', () => {
    it('get contact list by user correctly', async () => {
      const userFromDb = await userRepo.findOne();
      const contactListFromDb = await contactListRepo.findOne({
        userId: userFromDb.id,
      });
      const getContactLists = await contactlistService.getContactListsByUser(
        userFromDb.id,
      );
      expect(getContactLists.length).toEqual(1);
      expect(getContactLists[0].id).toEqual(contactListFromDb.id);
    });
  });

  describe('updateContactList', () => {
    it('update contact list by id correctly', async () => {
      const contactListFromDb = await contactListRepo.findOne();
      const updateContactListDto: UpdateContactListDto = {
        name: 'update test1',
      };

      const updatedContactList = await contactlistService.updateContactList(
        contactListFromDb.id,
        updateContactListDto,
      );
      const updatedContactListFromDb = await contactListRepo.findOne(
        updatedContactList.id,
      );
      expect(updatedContactListFromDb.id).toEqual(contactListFromDb.id);
      expect(updatedContactListFromDb.name).toEqual(updateContactListDto.name);
    });
  });

  describe('addContactsToContactList', () => {
    it('add contacts to contact list correctly', async () => {
      const contactListFromDb = await contactListRepo.findOne({
        userId: userForTest.id,
      });
      const addContactsToContacListDto: AddContactsToContacListDto = {
        contactIds: [contactForTest.id],
      };
      await contactlistService.addContactsToContactList(
        addContactsToContacListDto,
        contactListFromDb.id,
      );
      const addedContactListFromDb = await contactListRepo.findOne(
        {
          userId: userForTest.id,
        },
        { relations: ['contacts'] },
      );

      expect(addedContactListFromDb.contacts[0].id).toEqual(contactForTest.id);
    });
  });

  describe('getContactsInContactList', () => {
    it('get contacts in contact list correctly', async () => {
      const contactListFromDb = await contactListRepo.findOne(
        {
          userId: userForTest.id,
        },
        { relations: ['contacts'] },
      );
      const getContacts = await contactlistService.getContactsInContactList(
        contactListFromDb.id,
      );
      expect(getContacts.length).toEqual(1);
      expect(getContacts[0].id).toEqual(contactListFromDb.contacts[0].id);
    });
  });

  describe('removeContactsFromContactList', () => {
    it('remove contacts from contact list correctly', async () => {
      const contactListFromDb = await contactListRepo.findOne({
        userId: userForTest.id,
      });
      const removeContactsToContacListDto: RemoveContactsFromContacListDto = {
        contactIds: [contactForTest.id],
      };
      await contactlistService.removeContactsFromContactList(
        removeContactsToContacListDto,
        contactListFromDb.id,
      );
      const addedContactListFromDb = await contactListRepo.findOne(
        {
          userId: userForTest.id,
        },
        { relations: ['contacts'] },
      );

      expect(addedContactListFromDb.contacts.length).toEqual(0);
    });
  });

  describe('deleteContactList', () => {
    it('delete contact by id correctly', async () => {
      const contactListFromDb = await contactListRepo.findOne();

      await contactlistService.deleteContactList(contactListFromDb.id);
      const deletedContactListFromDb = await contactListRepo.findOne(
        contactListFromDb.id,
      );
      expect(deletedContactListFromDb).toBeFalsy();
    });
  });
});

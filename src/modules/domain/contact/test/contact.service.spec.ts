import * as config from 'config';
import { getConnection, Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ContactService } from '../contact.service';
import { Contact } from '@entities/contact.entity';
import { User } from '@entities/user.entity';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';

describe(ContactService.name, () => {
  let module: TestingModule;
  let contactRepo: Repository<Contact>;
  let userRepo: Repository<User>;
  let contactService: ContactService;

  let userForTest: User;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.get('db')),
        TypeOrmModule.forFeature([Contact, User]),
      ],
      providers: [ContactService],
    }).compile();

    userRepo = module.get(getRepositoryToken(User));
    contactRepo = module.get(getRepositoryToken(Contact));

    contactService = module.get(ContactService);

    const newUser = Object.assign(new User(), {
      name: 'test user',
      email: 'test@example.com',
    });
    userForTest = await userRepo.save(newUser);
  });

  afterAll(async () => {
    await getConnection().synchronize(true);
    module.close();
  });

  describe('createContact', () => {
    it('create contact correctly', async () => {
      const createContactDto: CreateContactDto = {
        email: 'test@example.com',
        name: 'test1',
        userId: userForTest.id,
      };
      const createdContact = await contactService.createContact(
        createContactDto,
      );
      const contactFromDb = await contactRepo.findOne(createdContact.id);
      expect(contactFromDb.email).toEqual(createContactDto.email);
      expect(contactFromDb.userId).toBe(userForTest.id);
    });
  });

  describe('getContact', () => {
    it('get contact correctly', async () => {
      const contactFromDb = await contactRepo.findOne();
      const getContact = await contactService.getContact(contactFromDb.id);
      expect(contactFromDb.email).toEqual(getContact.email);
    });
  });

  describe('getContactByUser', () => {
    it('get contact by user correctly', async () => {
      const userFromDb = await userRepo.findOne();
      const contactFromDb = await contactRepo.findOne({
        userId: userFromDb.id,
      });
      const getContacts = await contactService.getContactsByUser(userFromDb.id);
      expect(getContacts.length).toEqual(1);
      expect(getContacts[0].id).toEqual(contactFromDb.id);
    });
  });

  describe('updateContact', () => {
    it('update contact by id correctly', async () => {
      const contactFromDb = await contactRepo.findOne();
      const updateContactDto: UpdateContactDto = {
        name: 'update test1',
      };

      const updatedContact = await contactService.updateContact(
        contactFromDb.id,
        updateContactDto,
      );
      const updatedContactFromDb = await contactRepo.findOne(updatedContact.id);
      expect(updatedContactFromDb.id).toEqual(contactFromDb.id);
      expect(updatedContactFromDb.email).toEqual(contactFromDb.email);
      expect(updatedContactFromDb.name).toEqual(updateContactDto.name);
    });
  });

  describe('deleteContact', () => {
    it('delete contact by id correctly', async () => {
      const contactFromDb = await contactRepo.findOne();

      await contactService.deleteContact(contactFromDb.id);
      const deletedContactFromDb = await contactRepo.findOne(contactFromDb.id);
      expect(deletedContactFromDb).toBeFalsy();
    });
  });
});

import * as config from 'config';
import { getConnection, Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

describe(UserService.name, () => {
  let module: TestingModule;
  let userRepo: Repository<User>;
  let userService: UserService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.get('db')),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();

    userRepo = module.get(getRepositoryToken(User));
    userService = module.get(UserService);
  });

  afterAll(async () => {
    await getConnection().synchronize(true);
    module.close();
  });

  describe('registerUser', () => {
    it('registers user correctly', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'test1',
      };
      const createdUser = await userService.registerUser(createUserDto);
      const userFromDb = await userRepo.findOne(createdUser.id);
      expect(userFromDb.email).toEqual(createUserDto.email);
    });
  });

  describe('getUser', () => {
    it('get user correctly', async () => {
      const userFromDb = await userRepo.findOne();
      const getUser = await userService.getUser(userFromDb.id);
      expect(userFromDb.email).toEqual(getUser.email);
    });
  });

  describe('getUserByemail', () => {
    it('get user by email correctly', async () => {
      const userFromDb = await userRepo.findOne();
      const getUser = await userService.getUserByemail(userFromDb.email);
      expect(userFromDb.email).toEqual(getUser.email);
    });
  });

  describe('updateUser', () => {
    it('update user by id correctly', async () => {
      const userFromDb = await userRepo.findOne();
      const updateUserDto: UpdateUserDto = {
        email: 'update@example.com',
        name: 'update test1',
      };

      const updatedUser = await userService.updateUser(
        userFromDb.id,
        updateUserDto,
      );
      const updatedUserFromDb = await userRepo.findOne(updatedUser.id);
      expect(updatedUserFromDb.id).toEqual(userFromDb.id);
      expect(updatedUserFromDb.email).toEqual(updateUserDto.email);
      expect(updatedUserFromDb.name).toEqual(updateUserDto.name);
    });
  });

  describe('deleteUser', () => {
    it('delete user by id correctly', async () => {
      const userFromDb = await userRepo.findOne();

      await userService.deleteUser(userFromDb.id);
      const deletedUserFromDb = await userRepo.findOne(userFromDb.id);
      expect(deletedUserFromDb).toBeFalsy();
    });
  });
});

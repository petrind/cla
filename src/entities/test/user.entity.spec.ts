import * as config from 'config';
import { getConnection, Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';

describe(User.name, () => {
  let module: TestingModule;
  let userRepo: Repository<User>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.get('db')),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [],
    }).compile();

    userRepo = module.get(getRepositoryToken(User));
  });

  afterAll(async () => {
    await getConnection().synchronize(true);
    module.close();
  });

  describe('lowercaseEmail on @BeforeInsert and @BeforeUpdate', () => {
    it('lowercases email when user is inserted and updated', async () => {
      // @BeforeInsert
      const newUser = Object.assign(new User(), {
        name: 'test',
        email: 'UPPERCase@example.com',
      });
      const user = await userRepo.save(newUser);
      expect(user.email).toEqual('uppercase@example.com');

      // @BeforeUpdate
      user.email = 'nEW@exAMple.COm';
      const updatedUser = await userRepo.save(user);
      expect(updatedUser.email).toEqual('new@example.com');

      user.email = '';
      const updatedUser2 = await userRepo.save(user);
      expect(updatedUser2.email).toEqual('');
    });
  });
});

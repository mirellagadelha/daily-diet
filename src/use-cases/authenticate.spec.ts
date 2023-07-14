import { UsersRepository } from '@/repositories/users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credencials-error';

let usersRepository: UsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate an user', async () => {
    await usersRepository.create({
      name: 'New User',
      email: 'new-user@email.com',
      password: await hash('password', 6),
    });

    const { user } = await sut.execute({
      email: 'new-user@email.com',
      password: 'password',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate a non-existing user', async () => {
    await expect(
      sut.execute({
        email: 'non-existing-user@email.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate an user with wrong password', async () => {
    await usersRepository.create({
      name: 'New User',
      email: 'new-user@email.com',
      password: await hash('password', 6),
    });

    await expect(
      sut.execute({
        email: 'new-user@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate an user with wrong email', async () => {
    await usersRepository.create({
      name: 'New User',
      email: 'new-user@email.com',
      password: await hash('password', 6),
    });

    await expect(
      sut.execute({
        email: 'wrong-email@email.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});

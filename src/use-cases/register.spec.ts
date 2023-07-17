import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { compare } from 'bcryptjs';
import { RegisterUseCase } from './register';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('should register a new user', async () => {
    const { user } = await sut.execute({
      name: 'User',
      email: 'user@email.com',
      password: 'password',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not register a user with an existing email', async () => {
    const email = 'user@email.com';

    await sut.execute({
      name: 'User',
      email,
      password: 'password',
    });

    expect(() =>
      sut.execute({
        name: 'User',
        email,
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should hash the user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'User',
      email: 'user@email.com',
      password: 'password',
    });

    const isPasswordCorrectlyHashed = await compare('password', user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});

import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return {
      user,
    };
  }
}

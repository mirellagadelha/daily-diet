import { MealsRepository } from '@/repositories/meals-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { FetchUserMealsUseCase } from './fetch-user-meals';

let mealsRepository: MealsRepository;
let sut: FetchUserMealsUseCase;

describe('Fetch User Meals Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    sut = new FetchUserMealsUseCase(mealsRepository);
  });

  it('should return a list of meals', async () => {
    await mealsRepository.create({
      name: 'Meal One',
      userId: 'user-id',
    });

    await mealsRepository.create({
      name: 'Meal Two',
      userId: 'user-id',
    });

    const { meals } = await sut.execute({
      userId: 'user-id',
    });

    expect(meals).toHaveLength(2);
    expect(meals).toEqual([
      expect.objectContaining({ name: 'Meal One' }),
      expect.objectContaining({ name: 'Meal Two' }),
    ]);
  });

  it('should not return meals from another user', async () => {
    await mealsRepository.create({
      name: 'Meal One',
      userId: 'user-id',
    });

    await mealsRepository.create({
      name: 'Meal Two',
      userId: 'user-id',
    });
  });
});

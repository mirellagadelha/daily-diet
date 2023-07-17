import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { RegisterMealUseCase } from './register-meal';

let mealsRepository: InMemoryMealsRepository;
let sut: RegisterMealUseCase;

describe('Register Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    sut = new RegisterMealUseCase(mealsRepository);
  });

  it('should register a new meal', async () => {
    const { meal } = await sut.execute({
      name: 'Meal',
      description: 'Description',
      datetime: new Date(),
      isDietMeal: false,
      userId: 'user-id',
    });

    expect(meal.id).toEqual(expect.any(String));
  });
});

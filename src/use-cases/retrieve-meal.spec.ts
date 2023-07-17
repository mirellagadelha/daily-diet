import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { RetrieveMealUseCase } from './retrieve-meal';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let mealsRepository: InMemoryMealsRepository;
let sut: RetrieveMealUseCase;

describe('Retrieve Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    sut = new RetrieveMealUseCase(mealsRepository);
  });

  it('should return a meal', async () => {
    const createdMeal = await mealsRepository.create({
      name: 'Meal',
      userId: 'user-id',
    });

    const { meal } = await sut.execute({
      mealId: createdMeal.id,
      userId: 'user-id',
    });

    expect(meal).toEqual(expect.objectContaining({ name: 'New Meal' }));
  });

  it('should throw an error if the meal does not exist', async () => {
    await expect(
      sut.execute({
        mealId: 'non-existing-meal',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to retrieve a meal from another user', () => {
    expect(
      sut.execute({
        mealId: 'meal-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});

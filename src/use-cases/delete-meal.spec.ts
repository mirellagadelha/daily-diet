import { MealsRepository } from '@/repositories/meals-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { DeleteMealUseCase } from './delete-meal';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let mealsRepository: MealsRepository;
let sut: DeleteMealUseCase;

describe('Delete Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    sut = new DeleteMealUseCase(mealsRepository);
  });

  it('should delete a meal', async () => {
    const meal = await mealsRepository.create({
      userId: 'user-id',
      name: 'Meal',
    });

    await expect(
      sut.execute({
        mealId: meal.id,
        userId: 'user-id',
      }),
    ).resolves.not.toThrow();
  });

  it('should throw if meal does not exist', async () => {
    await expect(
      sut.execute({
        mealId: 'non-existing meal',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to delete a meal from another user', async () => {
    const meal = await mealsRepository.create({
      userId: 'user-id',
      name: 'Meal',
    });

    await expect(
      sut.execute({
        mealId: meal.id,
        userId: 'another-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});

import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { UpdateMealUseCase } from './update-meal';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let mealsRepository: InMemoryMealsRepository;
let sut: UpdateMealUseCase;

describe('Update Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    sut = new UpdateMealUseCase(mealsRepository);
  });

  it('should be able to update a meal', async () => {
    const createdMeal = await mealsRepository.create({
      name: 'Meal',
      description: 'Description',
      datetime: new Date(2023, 0, 1, 12, 0, 0),
      isDietMeal: false,
      userId: 'user-id',
    });

    const { meal } = await sut.execute({
      mealId: createdMeal.id,
      userId: 'user-id',
      name: 'Updated Meal',
      description: 'Updated Description',
      isDietMeal: true,
    });

    expect(meal).toEqual(expect.objectContaining({ name: 'Updated Meal' }));
  });

  it('should not be able to update a non-existing meal', async () => {
    await expect(
      sut.execute({
        mealId: 'non-existing-meal-id',
        userId: 'user-id',
        name: 'Updated Meal',
        description: 'Updated Description',
        isDietMeal: true,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to update a meal from another user', async () => {
    const createdMeal = await mealsRepository.create({
      name: 'Meal',
      description: 'Description',
      datetime: new Date(2023, 0, 1, 12, 0, 0),
      isDietMeal: false,
      userId: 'user-id',
    });

    await expect(
      sut.execute({
        mealId: createdMeal.id,
        userId: 'another-user-id',
        name: 'Updated Meal',
        description: 'Updated Description',
        isDietMeal: true,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});

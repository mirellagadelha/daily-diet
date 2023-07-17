import { MealsRepository } from '@/repositories/meals-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { RetrieveUserMetricsUseCase } from './retrieve-user-metrics';

let mealsRepository: MealsRepository;
let sut: RetrieveUserMetricsUseCase;

describe('Retrieve User Metrics Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    sut = new RetrieveUserMetricsUseCase(mealsRepository);
  });

  it('should return the user metrics', async () => {
    await mealsRepository.create({
      name: 'New Meal',
      isDietMeal: true,
      userId: 'user-id',
    });

    await expect(
      sut.execute({
        userId: 'user-id',
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        totalMeals: 1,
      }),
    );
  });

  it('should return the best diet meal sequence', async () => {
    await mealsRepository.create({
      name: 'New Meal',
      isDietMeal: true,
      userId: 'user-id',
    });

    await mealsRepository.create({
      name: 'New Meal',
      isDietMeal: true,
      userId: 'user-id',
    });

    await mealsRepository.create({
      name: 'New Meal',
      isDietMeal: false,
      userId: 'user-id',
    });

    await mealsRepository.create({
      name: 'New Meal',
      isDietMeal: true,
      userId: 'user-id',
    });

    await expect(
      sut.execute({
        userId: 'user-id',
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        bestDietMealSequence: 2,
      }),
    );
  });
});

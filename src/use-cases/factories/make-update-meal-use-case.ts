import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { UpdateMealUseCase } from '../meals/update-meal';

export function makeUpdateMealUseCase() {
  const mealsRepository = new PrismaMealsRepository();

  const useCase = new UpdateMealUseCase(mealsRepository);

  return useCase;
}

import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { RetrieveMealUseCase } from '../retrieve-meal';

export function makeRetrieveMealUseCase() {
  const mealsRepository = new PrismaMealsRepository();

  const useCase = new RetrieveMealUseCase(mealsRepository);

  return useCase;
}

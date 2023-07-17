import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { FetchUserMealsUseCase } from '../meals/fetch-user-meals';

export function makeFetchUserMealsUseCase() {
  const mealsRepository = new PrismaMealsRepository();

  const useCase = new FetchUserMealsUseCase(mealsRepository);

  return useCase;
}

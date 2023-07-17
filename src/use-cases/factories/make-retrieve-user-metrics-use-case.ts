import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { RetrieveUserMetricsUseCase } from '../meals/retrieve-user-metrics';

export function makeRetrieveUserMetricsUseCase() {
  const mealsRepository = new PrismaMealsRepository();

  const useCase = new RetrieveUserMetricsUseCase(mealsRepository);

  return useCase;
}

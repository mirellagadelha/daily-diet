import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { RegisterMealUseCase } from '../register-meal';

export function makeRegisterMealUseCase() {
  const mealsRepository = new PrismaMealsRepository();

  const useCase = new RegisterMealUseCase(mealsRepository);

  return useCase;
}

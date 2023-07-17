import { Prisma, Meal } from '@prisma/client';

export interface MealsRepository {
  findByIdAndUserId(id: string, userId: string): Promise<Meal | null>;
  findManyByUserId(userId: string): Promise<Meal[]>;
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>;
  save(meal: Meal): Promise<Meal>;
  delete(meal: Meal): Promise<void>;
}

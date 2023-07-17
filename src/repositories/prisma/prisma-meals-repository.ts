import { Meal, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { MealsRepository } from '../meals-repository';

export class PrismaMealsRepository implements MealsRepository {
  async findByIdAndUserId(id: string, userId: string) {
    const meal = await prisma.meal.findUnique({
      where: {
        id,
        userId,
      },
    });

    return meal;
  }

  async findManyByUserId(userId: string) {
    const meals = await prisma.meal.findMany({
      where: {
        userId,
      },
    });

    return meals;
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = await prisma.meal.create({
      data,
    });

    return meal;
  }

  async save(data: Meal) {
    const updatedMeal = await prisma.meal.update({
      where: {
        id: data.id,
      },
      data,
    });

    return updatedMeal;
  }

  async delete(meal: Meal) {
    await prisma.meal.delete({
      where: {
        id: meal.id,
      },
    });
  }
}

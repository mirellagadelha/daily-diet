import { Meal, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { MealsRepository } from '../meals-repository';

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = [];

  async findByIdAndUserId(id: string, userId: string) {
    const meal = this.items.find(
      (item) => item.id === id && item.userId === userId,
    );

    if (!meal) {
      return null;
    }

    return meal;
  }

  async findManyByUserId(userId: string) {
    const meals = this.items.filter((item) => item.userId === userId);

    return meals;
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = {
      id: randomUUID(),
      userId: data.userId,
      name: data.name,
      description: data.description || '',
      datetime: data.datetime ? new Date(data.datetime) : new Date(),
      isDietMeal: data.isDietMeal || false,
    };

    this.items.push(meal);

    return meal;
  }

  async save(meal: Meal) {
    const mealIndex = this.items.findIndex((item) => item.id === meal.id);

    this.items[mealIndex] = meal;

    return meal;
  }

  async delete(meal: Meal) {
    const mealIndex = this.items.findIndex((item) => item.id === meal.id);

    this.items.splice(mealIndex, 1);
  }
}

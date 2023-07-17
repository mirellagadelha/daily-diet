import { MealsRepository } from '@/repositories/meals-repository';
import { getBestDietMealSequence } from '@/utils/get-best-diet-meal-sequence';

interface RetrieveUserMetricsUseCaseRequest {
  userId: string;
}

interface RetrieveUserMetricsUseCaseResponse {
  totalMeals: number;
  totalDietMeals: number;
  totalNonDietMeals: number;
  bestDietMealSequence: number;
}

export class RetrieveUserMetricsUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    userId,
  }: RetrieveUserMetricsUseCaseRequest): Promise<RetrieveUserMetricsUseCaseResponse> {
    const meals = await this.mealsRepository.findManyByUserId(userId);

    const totalMeals = meals.length;
    const totalDietMeals = meals.filter((meal) => meal.isDietMeal).length;

    const totalNonDietMeals = totalMeals - totalDietMeals;
    const bestDietMealSequence = await getBestDietMealSequence(meals);

    return {
      totalMeals,
      totalDietMeals,
      totalNonDietMeals,
      bestDietMealSequence,
    };
  }
}

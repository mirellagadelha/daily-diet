import { MealsRepository } from '@/repositories/meals-repository';
import { Meal } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface UpdateMealUseCaseRequest {
  mealId: string;
  userId: string;
  name?: string;
  description?: string;
  datetime?: Date;
  isDietMeal?: boolean;
}

interface UpdateMealUseCaseResponse {
  meal: Meal;
}

export class UpdateMealUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    mealId,
    userId,
    name,
    description,
    datetime,
    isDietMeal,
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const meal = await this.mealsRepository.findByIdAndUserId(mealId, userId);

    if (!meal) {
      throw new ResourceNotFoundError();
    }

    const updatedMeal = {
      ...meal,
      name: name || meal.name,
      description: description || meal.description,
      datetime: datetime || meal.datetime,
      is_diet_meal: isDietMeal || meal.is_diet_meal,
    };

    await this.mealsRepository.save(updatedMeal);

    return {
      meal: updatedMeal,
    };
  }
}

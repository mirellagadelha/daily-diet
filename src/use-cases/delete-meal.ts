import { MealsRepository } from '@/repositories/meals-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface DeleteMealUseCaseRequest {
  mealId: string;
  userId: string;
}

export class DeleteMealUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({ mealId, userId }: DeleteMealUseCaseRequest): Promise<void> {
    const meal = await this.mealsRepository.findByIdAndUserId(mealId, userId);

    if (!meal) {
      throw new ResourceNotFoundError();
    }

    await this.mealsRepository.delete(meal);
  }
}

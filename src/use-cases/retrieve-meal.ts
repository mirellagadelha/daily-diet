import { MealsRepository } from '@/repositories/meals-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface RetrieveMealUseCaseRequest {
  mealId: string;
  userId: string;
}

export class RetrieveMealUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({ mealId, userId }: RetrieveMealUseCaseRequest) {
    const meal = await this.mealsRepository.findByIdAndUserId(mealId, userId);

    if (!meal) {
      throw new ResourceNotFoundError();
    }

    return {
      meal,
    };
  }
}

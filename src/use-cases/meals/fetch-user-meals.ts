import { MealsRepository } from '@/repositories/meals-repository';
import { Meal } from '@prisma/client';

interface FetchUserMealsUseCaseRequest {
  userId: string;
}

interface FetchUserMealsUseCaseResponse {
  meals: Meal[];
}

export class FetchUserMealsUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    userId,
  }: FetchUserMealsUseCaseRequest): Promise<FetchUserMealsUseCaseResponse> {
    const meals = await this.mealsRepository.findManyByUserId(userId);

    return {
      meals,
    };
  }
}

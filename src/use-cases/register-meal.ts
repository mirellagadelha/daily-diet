import { MealsRepository } from '@/repositories/meals-repository';

interface RegisterMealUseCaseRequest {
  userId: string;
  name: string;
  description?: string;
  datetime?: Date;
  isDietMeal?: boolean;
}

export class RegisterMealUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    userId,
    name,
    description,
    datetime,
    isDietMeal,
  }: RegisterMealUseCaseRequest) {
    const meal = await this.mealsRepository.create({
      user_id: userId,
      name,
      description,
      datetime,
      is_diet_meal: isDietMeal,
    });

    return {
      meal,
    };
  }
}

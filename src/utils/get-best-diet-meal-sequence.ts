import { Meal } from '@prisma/client';

export function getBestDietMealSequence(meals: Meal[]): Meal[] {
  let currentDietMealSequence: Meal[] = [];
  let bestDietMealSequence: Meal[] = [];

  meals.forEach((meal) => {
    if (meal.isDietMeal) {
      // Add the current meal to the current sequence array
      currentDietMealSequence.push(meal);

      // Update the best sequence if the current sequence is longer
      if (currentDietMealSequence.length > bestDietMealSequence.length) {
        bestDietMealSequence = [...currentDietMealSequence];
      }
    }

    if (!meal.isDietMeal) {
      currentDietMealSequence = [];
    }
  });

  return bestDietMealSequence;
}

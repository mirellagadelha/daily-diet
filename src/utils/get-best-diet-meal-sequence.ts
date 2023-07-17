import { Meal } from '@prisma/client';

export async function getBestDietMealSequence(meals: Meal[]) {
  let currentDietMealSequence = 0;
  let bestDietMealSequence = 0;

  meals.forEach((meal) => {
    if (meal.isDietMeal) {
      // Increment the current sequence count
      currentDietMealSequence += 1;

      // Update the best sequence if the current sequence is longer
      if (currentDietMealSequence > bestDietMealSequence) {
        bestDietMealSequence = currentDietMealSequence;
      }
    } else {
      // Reset the current sequence count
      currentDietMealSequence = 0;
    }
  });

  return bestDietMealSequence;
}

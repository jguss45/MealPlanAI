function formatMealPlanString(inputString) {
  const days = inputString.split("Day ");
  const formattedStrings = days.slice(1).map((day, index) => {
    const meals = day.trim().split("Meal ");
    const formattedMeals = meals.slice(1).map((meal, mealIndex) => {
      const mealNumber = mealIndex + 1;
      const mealDescription = meal.replace(/^\d+ - /, '');
      return `Meal ${mealNumber}: ${mealDescription.trim()}`;
    });
    return `Day ${index + 1}:\n${formattedMeals.join("\n")}`;
  });
  return formattedStrings;
}

export default formatMealPlanString;
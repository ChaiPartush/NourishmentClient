// Explain object of number of calories for one gram of each parent food 
import { ParentFoodCalories } from '../../constants/Logics/FoodTypesClories'

export const CalculateAmountOfFoodTypes = (totalCalories, weight) => {
    const protainsAmount = weight * 1.8
    const protainsCalories = protainsAmount * ParentFoodCalories.protain
    const fatsAmount = weight
    const fatCalories = fatsAmount * ParentFoodCalories.fat
    const carbohydrateCalories = totalCalories - (protainsCalories + fatCalories)
    const carbohydrateAmount = carbohydrateCalories / ParentFoodCalories.carbohydrate



    const gramsOfEachFoodType = {
        carbohydrates: carbohydrateAmount,
        fats: fatsAmount,
        protains: protainsAmount
    }

    return gramsOfEachFoodType;

}
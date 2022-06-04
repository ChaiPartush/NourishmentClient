import { ConstantNodeDependencies } from 'mathjs'
import { FoodTypesCalories } from '../../constants/Logics/FoodTypesClories'

export const CalculateAmountOfFoodTypes = (totalCalories, weight) => {
    const protainsAmount = weight * 1.8
    const protainsCalories = protainsAmount * FoodTypesCalories.protain
    const fatsAmount = weight
    const fatCalories = fatsAmount * FoodTypesCalories.fat
    const carbohydrateCalories = totalCalories - (protainsCalories + fatCalories)
    const carbohydrateAmount = carbohydrateCalories / FoodTypesCalories.carbohydrate



    const gramsOfEachFoodType = {
        carbohydrates: carbohydrateAmount,
        fats: fatsAmount,
        protains: protainsAmount
    }

    return gramsOfEachFoodType;

}
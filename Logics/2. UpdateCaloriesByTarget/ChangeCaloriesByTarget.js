import { TargetType } from '../../constants/Logics/ChangeCaloriesByTargetConsts'

export const ChangeCaloriesByTarget = (bmr, target) => {
    if (target === TargetType.GainWeight) {
        const gainWeightCalories = bmr * 1.2;
        return gainWeightCalories

    } else if (target === TargetType.LossWeight) {
        const lossWeightCalories = bmr * 0.85;
        return lossWeightCalories
    }
    return bmr
}
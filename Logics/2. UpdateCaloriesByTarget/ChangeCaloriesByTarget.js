// object of types of targets 
import { TargetType } from '../../constants/Logics/ChangeCaloriesByTargetConsts'

/** function that update current calories by target 
 * 
 * function thet get the following things:
 * @param {Number} currenrCalories - number of calories that we want to change them 
 * @param {String} target - name of target that chosen by the user
 * 
 * return the new calories number 
 */
export const ChangeCaloriesByTarget = (currenrCalories, target) => {
    if (target === TargetType.GainWeight) {
        const gainWeightCalories = currenrCalories * 1.2;
        return gainWeightCalories

    } else if (target === TargetType.LossWeight) {
        const lossWeightCalories = currenrCalories * 0.85;
        return lossWeightCalories
    }
    return currenrCalories
}
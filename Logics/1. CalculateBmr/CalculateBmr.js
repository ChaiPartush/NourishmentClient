import { GenderType } from '../../constants/Logics/CalculateBmrConsts'


export const CalculateBmr = (height, weight, gender, age) => {
    if (gender === GenderType.male) {
        const maleBmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        return maleBmr;
    } else {
        const femaleBmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        return femaleBmr;
    }
}
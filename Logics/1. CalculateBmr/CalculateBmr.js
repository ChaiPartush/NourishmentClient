// explain import below - object of all types of gender
import { GenderType } from '../../constants/Logics/CalculateBmrConsts'

// Function explanation - calculate the number of calories that the body need for necessary physical functions

// Input - 
// ** height -  number of current height of user
// ** height -  number of current height of user
// ** height -  number of current height of user
// ** height -  number of current height of user

// Output - 
/** 
 * fucntion that get the following things: 
 * @param {Number} height - current height of user 
 * @param {Number} weight - current weight of user
 * @param {String} gender - the gender of user
 * @param {Number} age - the age of user 
 * and return number of calories the body need for necessary physical functions
 */
export const CalculateBmr = (height, weight, gender, age) => {

    if (gender === GenderType.male) {

        const maleBmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        return maleBmr;

    } else if (gender === GenderType.female) {

        const femaleBmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        return femaleBmr;

    }
}
import { CalculateBmr } from './1. CalculateBmr/CalculateBmr'
import { ChangeCaloriesByTarget } from './2. UpdateCaloriesByTarget/ChangeCaloriesByTarget'
import { CalculateAmountOfFoodTypes } from './3. AmountEachParentFood/CalculateAmountOfFoodTypes'
import { DivideFoodTypesValuesToProducts } from './4. CalculateQuantityForEachLikeProducts/CalculateQuantityOfEachFood'
import { CalculateProductsQuantity } from './4. CalculateQuantityForEachLikeProducts/CaluculateProductsQuantity'
import { FoodTypes } from '../constants/Logics/FoodTypes'
import { db } from '../config'
import { CreateMenuMealsByNumberOfMeals } from './5. CreateMeals/CreateMenuMeals'
import { useRef } from 'react'

export const LogicIndex = async (height, weight, gender, age, target, namesOfLikesProductsArray) => {
    let productsParentFoodValues = useRef({})
    // calculate how many calories the body need to stay alive
    const bmr = CalculateBmr(height, weight, gender, age)
    // change the number of calories we calculate above by target 
    const caloriesByTarget = ChangeCaloriesByTarget(bmr, target)
    // calculate total carbohydrates,protains and fats we put in a menu
    const totalQuantityForEachParentFoodObject = CalculateAmountOfFoodTypes(caloriesByTarget, weight)
    // get the value of carbohydrates,protains,fats and calories of each product of likes foods
    for (let index = 0; index < namesOfLikesProductsArray.length; index++) {
        const product = namesOfLikesProductsArray[index];
        const itemObj = await getProductObject(product)
        productsParentFoodValues.current[product] = itemObj
    }

    // Calculate quantity of each prodct by total food types values
    const productsQuantity = CalculateProductsQuantity(productsParentFoodValues.current, totalQuantityForEachParentFoodObject)
    let meals = null

    // check if succeed to 
    if (productsQuantity["result"] === true) {

        // if success to get quantity of each product by food types values order it by number of meals and
        // precent of each meal from total calories  
        meals = CreateMenuMealsByNumberOfMeals(productsQuantity["value"], { 1: 25, 2: 25, 3: 25, 4: 25 }, productsParentFoodValues.current)
        CheckTotal(meals, productsParentFoodValues.current, totalQuantityForEachParentFoodObject)
        // create meals object to string 
        const mealsJson = JSON.stringify(meals)
        // return meals 
        return mealsJson
    }
    else {
        const value = productsQuantity["value"]
        const carbohydrate = Math.abs(value[FoodTypes.carbohydrates])
        const fats = Math.abs(value[FoodTypes.fats])
        const protains = Math.abs(value[FoodTypes.protains])
        const maxValue = CheckForMaxType(carbohydrate, fats, protains)
        return maxValue
    }
}


const getProductObject = async (productName) => {
    for (let foodType in FoodTypes) {
        const parentFoodString = "/foodType_" + foodType
        const item = db.collection(parentFoodString).doc(productName)
        const doc = await item.get()
        if (doc.exists) {
            const itemObj = {
                caloriesFor100Grams: doc.data()["caloriesFor100Grams"],
                carbohydratesFor100Grams: doc.data()["carbohydratesFor100Grams"],
                fatsFor100Grams: doc.data()["fatsFor100Grams"],
                name: doc.data()["name"],
                protainsFor100Grams: doc.data()["protainsFor100Grams"],
                type: doc.data()["type"]
            }
            return itemObj
        }
    }
}
export const ProductValuesObject = async (productsNamesArray) => {
    let obj = {}
    for (let index = 0; index < productsNamesArray.length; index++) {
        const product = productsNamesArray[index];
        const itemObj = await getProductObject(product)
        obj[product] = itemObj
    }
    return obj
}

const CheckForMaxType = (carbohydrates, fats, protains) => {
    if (carbohydrates > fats) {
        if (carbohydrates > protains) {
            return FoodTypes.carbohydrates
        }
        else {
            return FoodTypes.protains
        }
    } else {
        if (fats > protains) {
            return FoodTypes.fats
        } else {
            return FoodTypes.protains
        }
    }
}


const CheckTotal = (meals, productsParentFoodValues, total) => {
    let totalValues = {
        carbohydrates: 0,
        fats: 0,
        protains: 0
    }

    for (let meal in meals) {
        const mealObj = meals[meal]
        for (let product in mealObj) {

            const valueProduct = mealObj[product]
            const carbohydrateValueFor100Grams = productsParentFoodValues[product]["carbohydratesFor100Grams"] / 100
            const fatsValueFor100Grams = productsParentFoodValues[product]["fatsFor100Grams"] / 100
            const protainsValuesFor100Grams = productsParentFoodValues[product]["protainsFor100Grams"] / 100
            totalValues[FoodTypes.carbohydrates] = totalValues[FoodTypes.carbohydrates] + (carbohydrateValueFor100Grams * valueProduct)
            totalValues[FoodTypes.fats] = totalValues[FoodTypes.fats] + (fatsValueFor100Grams * valueProduct)
            totalValues[FoodTypes.protains] = totalValues[FoodTypes.protains] + (protainsValuesFor100Grams * valueProduct)
        }
    }


    const carbohydratesDiff = Math.abs(total[FoodTypes.carbohydrates] - totalValues[FoodTypes.carbohydrates])
    const fatsDiff = Math.abs(total[FoodTypes.fats] - totalValues[FoodTypes.fats])
    const protainsDiff = Math.abs(total[FoodTypes.protains] - totalValues[FoodTypes.protains])

    console.log(carbohydratesDiff, fatsDiff, protainsDiff)


}




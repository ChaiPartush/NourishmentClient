import { useRef } from 'react'

// Explain import below - object of all types of food: carbohydrates,fats,protain and vitamins 
import { FoodTypes } from '../constants/Logics/FoodTypes'

// Explain import below - database configuration
import { db } from '../config'

// Explain import below - get product valuse from datsbase 
import { getProductObject } from '../functionsToControlDB'

import { CalculateBmr } from './1. CalculateBmr/CalculateBmr'
import { ChangeCaloriesByTarget } from './2. UpdateCaloriesByTarget/ChangeCaloriesByTarget'
import { CalculateAmountOfFoodTypes } from './3. AmountEachParentFood/CalculateAmountOfFoodTypes'
import { CalculateProductsQuantity } from './4. CalculateQuantityForEachLikeProducts/CaluculateProductsQuantity'
import { CreateMenuMealsByNumberOfMeals } from './5. CreateMeals/CreateMenuMeals'

// Function explanation - function that create menu 

// Input -
// ** height -  number of current height of user
// ** weight - number of current weight of user
// ** gender - number of gender of user
// ** age - number of current age of user 
// ** target - string of target of user want to acheive - gain weight, loss weight or balance diet 
// ** namesOfLikesProductsArray -array of products names that user like and he want they assemble the menu 

// Output - 
// * if succeed to create menu from products we get from user in the way that total number of carbohydrates,fats and protains 
// * appropriate to total carbohydrates,fats and protains that the user need by the other information we get above, so we will return object of menu
// * othewise we return the foodtype with the max lack  
export const LogicIndex = async (height, weight, gender, age, target, namesOfLikesProductsArray) => {

    // Explain Row below - 

    // -- calculate how many calories the body need for
    // -- necessary physical functions which called bmr

    // -- the type of bmr variable in number 
    const bmr = CalculateBmr(height, weight, gender, age)

    // Explain row below  -
    // -- change the number of calories we calculate above by chosen target 

    // -- the type of caloriesByTarget variable is number 
    const caloriesByTarget = ChangeCaloriesByTarget(bmr, target)

    // Explain row below  - 
    // -- Take the clories by target we calculate above and calculate the
    // --  total amount of carbohydrates,protains and fats the user need to consume 

    // -- the type of objectOfTotalQuantityForEachParentFood variable is object 
    // -- it look like this: {carbohydrates: number ,fats: number , protains:number}
    const objectOfTotalQuantityForEachParentFood = CalculateAmountOfFoodTypes(caloriesByTarget, weight)


    // Explain row below - 
    // -- object of all product that chosen to assemble in menu with 
    // -- value for 100 grams of carbohydrates,protains,fats and calories

    // -- the type of productsParentFoodValues is object 
    // -- it look like this : 
    // -- {
    // --  nameOfProduct: {
    // --       caloriesFor100Grams: number,
    // --       carbohydratesFor100Grams: number,
    // --       fatsFor100Grams: number, 
    // --       name: string,
    // --       protainsFor100Grams: number,
    // --       type:string}, {} , {}, {},...
    // -- }
    let productsParentFoodValues = useRef({})

    // Explain row below - loop on list of product that the user choose 
    for (let index = 0; index < namesOfLikesProductsArray.length; index++) {

        // Explain row below 
        // -- get the name of the current product 

        // -- the type of product variable is string  
        const product = namesOfLikesProductsArray[index];

        //Explain row below - 
        // -- get object of values for 100 grams of carbohydrates,
        // -- protains,fats and calories of the product above

        // -- the type of itemObj is object 
        //-- it look like this : 
        // --  {
        // --       caloriesFor100Grams: number,
        // --       carbohydratesFor100Grams: number,
        // --       fatsFor100Grams: number, 
        // --       name: string,
        // --       protainsFor100Grams: number,
        // --       type:string
        // --  }

        const itemObj = await getProductObject(product)

        // Explain row below - 
        // -- add the object we get above into 
        // -- object of all products values objects that we called it productsParentFoodValues
        productsParentFoodValues.current[product] = itemObj
    }


    //Explain row below 
    // -- calculate the total quantity of each product in the menu 

    // -- the type of productsQuantity variable is object 

    // -- if sucsess to calculate quantity of each product in the way that the
    //-- total carbohydrates,protains,fats of all these quantity product to grater then 1 gram
    //-- we will get object with 2 fields:
    //-- 1. field of result that represent the fact that it sucsess to do it with value of true
    //-- 2. field of value with object of all products with their quantities 
    //-- the object look like this :  
    // -- {
    // --    result:true
    // --    value: {productname: numer, productname: numer, .... }
    //--  }

    //-- otherwise we will get object with 2 fields:
    //-- 1. field of result that represent the fact that it not sucsess to do it with value of false
    //-- 2. field of value with object with the distance of each food type from the real value 
    //-- the object look like this :  
    //-- {
    //--      result:false
    //--     {carbohydrates: number, protains:number,fats:number}
    //-- }
    const productsQuantity = CalculateProductsQuantity(productsParentFoodValues.current, objectOfTotalQuantityForEachParentFood)

    //Explain row below - check if sucsess to calculate quantities from chosen products
    if (productsQuantity["result"] === true) {

        // Explain row below - sperate the products quantities to meals 
        //-- the type of meals variable is object 
        //-- we will get an object with numbers fields, each number represent number of meal 
        //-- and in each number field there is object with all products in this meal with their quantity
        //-- the object look like that : 
        //-- {1:{productNume:number, productNume:number,...},2{...},3{...},...}
        let meals = CreateMenuMealsByNumberOfMeals(productsQuantity["value"], { 1: 25, 2: 25, 3: 25, 4: 25 }, productsParentFoodValues.current)

        // Explain row below - calculate the current diffrent of each food type from real value 
        //-- the type of totaldiff variable is object 
        //-- we will get object with the differnce value of each food type from real value
        //-- the object look like that:
        //--  {carbohydrates: number, protains:number,fats:number}
        let totalDiff = CheckTotal(meals, productsParentFoodValues.current, objectOfTotalQuantityForEachParentFood)
        
        if(totalDiff[FoodTypes.carbohydrates]>1 || totalDiff[FoodTypes.fats]>1||totalDiff[FoodTypes.protains]>1){

        }
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
// move to functions on db 
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

    return {
        carbohydrates: carbohydratesDiff,
        fats: fatsDiff,
        protains: protainsDiff
    }




}




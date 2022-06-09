import { CalculateBmr } from './1. CalculateBmr/CalculateBmr'
import { ChangeCaloriesByTarget } from './2. UpdateCaloriesByTarget/ChangeCaloriesByTarget'
import { CalculateAmountOfFoodTypes } from './3. AmountEachParentFood/CalculateAmountOfFoodTypes'
import { DivideFoodTypesValuesToProducts } from './4. CalculateQuantityForEachLikeProducts/CalculateQuantityOfEachFood'
import { CalculateProductsQuantity } from './4. CalculateQuantityForEachLikeProducts/CaluculateProductsQuantity'
import { CreateMeals } from './5. CreateMeals/CreateMeals'
import React, { useState, useEffect, useContext } from "react";
import { FoodTypes } from '../constants/Logics/FoodTypes'
import { db } from '../config'
import { identity, json } from 'mathjs'
import { constraintToPreRow } from 'simple-simplex/dist/lib/simple-simplex/simplex-helpers'
let productsObject = []

let arr = []

// const GetField = () => {
//     const parentFoodString = "/foodType_" + 'carbohydrates'
//     const citiesRef = db.collection(parentFoodString)
//     const snapshot = await citiesRef.where('id', '==', 1).get();
//     if (snapshot.empty) {
//         console.log('No matching documents.');
//     }

//     snapshot.forEach(doc => {
//         console.log(doc.data()["name"]);
//     });
// }

const GetProductObject = async (productName) => {
    const DeviceHost = "192.168.1.14";
    const body = { productName };
    let a = await fetch(`http://${DeviceHost}:3000/food/getProductObject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    const b = await a.json()
    return b
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


export const LogicIndex = async (height, weight, gender, age, target, namesOfLikesProductsArray) => {

    // calculate how many calories the body need to stay alive
    const bmr = CalculateBmr(height, weight, gender, age)

    // change the number of calories we calculate above by target 
    const caloriesByTarget = ChangeCaloriesByTarget(bmr, target)

    // calculate total carbohydrates,protains and fats we put in a menu
    const totalQuantityForEachParentFoodObject = CalculateAmountOfFoodTypes(caloriesByTarget, weight)

    // get the value of carbohydrates,protains,fats and calories of each product of likes foods
    const productsParentFoodValues = await ProductValuesObject(namesOfLikesProductsArray)

   
    const productsQuantity = CalculateProductsQuantity(productsParentFoodValues, totalQuantityForEachParentFoodObject)
    console.log(productsQuantity)







    //const quantityForEachLikeProductObject = await DivideFoodTypesValuesToProducts(values, totalQuantityForEachParentFoodObject)
    //const createMealsObject = CreateMeals(productsQuantity)
    // return createMealsObject
}

import { ConstantNodeDependencies, json } from "mathjs";
import React, { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { FoodTypes, calculatedFoodTypes } from '../../constants/Logics/FoodTypes'
import { VALUES } from "../4. CalculateQuantityForEachLikeProducts/CalculateQuantityOfEachFood";

const GetProductsDividesToParentsFoodObject = (DivideFoodTypesValuesToProducts) => {

    let parentsFood = {
        carbohydrate: [],
        fats: [],
        protains: [],
        vitamins: []
    }

    // const quantityFromEachFood = DivideFoodTypesValuesToProducts()
    for (let item in DivideFoodTypesValuesToProducts) {
        const parentFood = VALUES[item]["productType"];
        const itemObject = {
            name: item,
            quantity: DivideFoodTypesValuesToProducts[item]
        }
        parentsFood[parentFood].push(itemObject)
    }

    return parentsFood
}

const GetTotalCaloriesFromEachParentFood = (parentFoodProductsObject) => {
    let calriesFromEachParentFood = {
        carbohydrate: 0,
        fats: 0,
        protains: 0,
        vitamins: 0
    }
    for (parentFood in parentFoodProductsObject) {
        for (let productIndex = 0; productIndex < parentFoodProductsObject[parentFood].length; productIndex++) {
            const productName = parentFoodProductsObject[parentFood][productIndex]["name"]
            const quantity = parentFoodProductsObject[parentFood][productIndex]["quantity"]
            const calorisTo100Grams = VALUES[productName]["calories"]
            const caloriesForProductQuantity = (calorisTo100Grams / 100) * quantity
            calriesFromEachParentFood[parentFood] += caloriesForProductQuantity
        }
    }
    return calriesFromEachParentFood
}

export const CreateMeals = (DivideFoodTypesValuesToProducts) => {
    const mealsPrecents = { 1: 25, 2: 25, 3: 25, 4: 25 }

    let meals = {
        1: [],
        2: [],
        3: [],
        4: [],
    }

    const productsDivideToTheirParentFood = GetProductsDividesToParentsFoodObject(DivideFoodTypesValuesToProducts)
    let productsDivideToTheirParentFoodForUpdated = GetProductsDividesToParentsFoodObject(DivideFoodTypesValuesToProducts)
    let totalCaloriesForEachParentFood = GetTotalCaloriesFromEachParentFood(productsDivideToTheirParentFood)
    for (let meal in mealsPrecents) {
        const precent = mealsPrecents[meal]
        for (parentFoodCaloriesIndex in totalCaloriesForEachParentFood) {
            const numberOfProducts = productsDivideToTheirParentFood[parentFoodCaloriesIndex].length
            const multiply100PrecentByNumberOfProducts = 100 * numberOfProducts
            const precentByMultiplyAbove = multiply100PrecentByNumberOfProducts * (precent / 100)
            let found = false
            let productIndex = 0
            while (found === false) {
                const productName = productsDivideToTheirParentFood[parentFoodCaloriesIndex][productIndex]["name"]
                const productQuantity = productsDivideToTheirParentFood[parentFoodCaloriesIndex][productIndex]["quantity"]
                if (productsDivideToTheirParentFoodForUpdated[parentFoodCaloriesIndex][productIndex]["quantity"] !== 0) {
                    found = true
                    const newQuantity = productQuantity * (precentByMultiplyAbove / 100)
                    const productObject = { name: productName, quantity: newQuantity }
                    meals[meal].push(productObject)
                    productsDivideToTheirParentFoodForUpdated[parentFoodCaloriesIndex][productIndex]["quantity"] -= newQuantity

                }
                else {
                    productIndex++
                }
            }
        }

    }

    return meals

}
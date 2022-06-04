import React, { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { configureFonts } from "react-native-paper";
import { diff, stopClock } from "react-native-reanimated";
import { FoodTypes, calculatedFoodTypes } from '../../constants/Logics/FoodTypes'
import { ProjectObject } from '../../constants/Logics/ProductOpjectProperties'
import { EquationSystemSolver } from './EquationSystemSolver'
import { ProductValuesObject } from '../4. ProductsValues/ProductsValuesObject'


// /**
//  * DB
//  */
export const VALUES = {
    rice: {
        carbohydrate: 78.6,
        fats: 0.6,
        protains: 6.9,
        productType: FoodTypes.carbohydrates,
        calories: 336

    },

    almond: {
        carbohydrate: 13.71,
        fats: 65.21,
        protains: 15.23,
        productType: FoodTypes.fats,
        calories: 575
    },

    beef: {
        carbohydrate: 0,
        fats: 16.67,
        protains: 26.58,
        productType: FoodTypes.protains,
        calories: 265
    },

    qinoa: {
        carbohydrate: 62.16,
        fats: 6.07,
        protains: 14.12,
        productType: FoodTypes.carbohydrates,
        calories: 368
    },

    tomatto: {
        carbohydrate: 3.9,
        fats: 0.2,
        protains: 0.887,
        productType: FoodTypes.vitamins,
        calories: 18
    },

    breast: {
        carbohydrate: 0,
        fats: 3.57,
        protains: 31.02,
        productType: FoodTypes.protains,
        calories: 165

    },

    avocado: {
        carbohydrate: 8.53,
        fats: 14.66,
        protains: 2,
        productType: FoodTypes.fats,
        calories: 160
    },

}





/**
 * Get the highest food type value of product
 */
const GetMainParentFood = (productName) => {
    const carbohydrate = VALUES[productName][FoodTypes.carbohydrates];
    const fat = VALUES[productName][FoodTypes.fats];
    const protain = VALUES[productName][FoodTypes.protains];

    if (carbohydrate >= fat) {
        if (carbohydrate >= protain) {
            return FoodTypes.carbohydrate
        }
        else {
            return FoodTypes.protains
        }
    }
    else if (fat >= protain) {
        return FoodTypes.fats
    }
    else return FoodTypes.protains;

}
/**
 * Get name of food type and return how many products this parent food is their main parent food
 */
const GetNumberOfProcdutThatThisIsTheirMainParentFood = (ParentsFoodObjectDivideToProducts, parentFoodName) => {
    let productsCounter = 0;
    for (const product in ParentsFoodObjectDivideToProducts[parentFoodName]) {
        const productObject = ParentsFoodObjectDivideToProducts[parentFoodName][product]
        if (productObject[ProjectObject.mainParentFood] === String(parentFoodName)) {
            productsCounter++
        }
    }
    return productsCounter;
}
/**
 * Get product name, grams of parent food and the name of it and return quantity from product
 */
const ConvertQuantityOfParentFoodToProductQuantity = (
    productName,
    parantFoodToConvertFrom,
    quantityOfParantFood) => {

    const convatorNumber = (VALUES[productName][parantFoodToConvertFrom]) / 100;
    return quantityOfParantFood / convatorNumber;

}
/**
 * Create object that discribe a product 
 */
const CreateProductObject = (productName, mainParentFood, parentFoodQuantity, productQuantity) => {
    return {
        name: productName,
        mainParentFood: mainParentFood,
        parentFoodQuantity: parentFoodQuantity,
        productQuantity: productQuantity
    }
}
/**
 * Get product name, quantity of product and the name of parent food to convert to and return quantity from parent food
 */
const ConvertProductQuantityToParentFoodQuantity = (productName, productQuantity, parentFoodToConvertTo) => {
    const convatorNumber = (VALUES[productName][parentFoodToConvertTo]) / 100;
    return productQuantity * convatorNumber;
}
const checkIfProductsInFoodTypeAppropriateToTotalValue = (parentsFoodObjectDivideToProducts, totalValueOfParentTypes) => {
    for (parentFood in parentsFoodObjectDivideToProducts) {
        let gramsOfParentFoodSum = 0
        let quantityGramsSum = 0

        for (product in parentsFoodObjectDivideToProducts[parentFood]['mainProducts']['products']) {

            const productQuntity = parentsFoodObjectDivideToProducts[parentFood]['mainProducts']['products'][product][ProjectObject.productQuantity]

            const convator = VALUES[product][parentFood] / 100
            const getGramsFromProductQuantity = convator * productQuntity
            gramsOfParentFoodSum += parentsFoodObjectDivideToProducts[parentFood]['mainProducts']['products'][product][ProjectObject.parentFoodQuantity]
            quantityGramsSum += getGramsFromProductQuantity

        }

        for (product in parentsFoodObjectDivideToProducts[parentFood]['notMainProducts']['products']) {

            const productObject = parentsFoodObjectDivideToProducts[parentFood]['notMainProducts']['products'][product]
            const getGramsFromProductQuantity = (((VALUES[product][parentFood]) / 100) * (productObject[ProjectObject.productQuantity]))
            gramsOfParentFoodSum += productObject[ProjectObject.parentFoodQuantity]
            quantityGramsSum += getGramsFromProductQuantity
        }

        const numberOfMainProducts = Object.keys(parentsFoodObjectDivideToProducts[parentFood]['mainProducts']['products']).length
        if (numberOfMainProducts !== 0 && ((Math.abs(totalValueOfParentTypes[parentFood] - gramsOfParentFoodSum)) > 35) && ((Math.abs(totalValueOfParentTypes[parentFood] - quantityGramsSum)) > 35)) {
            return false
        }
    }
    return true


}

const IsFoodTypeOrder = (parentFoodObject, realTotalParentFoodGrams, parentFood) => {
    let parentFoodQuantitySum = 0
    let parentFoodGramsByProductQuantity = 0
    const numberOfMainProducts = Object.keys(parentFoodObject['mainProducts']['products']).length
    if (numberOfMainProducts !== 0) {
        for (mainProduct in parentFoodObject['mainProducts']['products']) {
            const productQuntity = parentFoodObject['mainProducts']['products'][mainProduct][ProjectObject.productQuantity]
            const getGramsFromProductQuantity = ConvertProductQuantityToParentFoodQuantity(mainProduct, productQuntity, parentFood)
            parentFoodQuantitySum += parentFoodObject['mainProducts']['products'][mainProduct][ProjectObject.parentFoodQuantity]
            parentFoodGramsByProductQuantity += getGramsFromProductQuantity
        }

        for (notMainProduct in parentFoodObject['notMainProducts']['products']) {
            const productQuntity = parentFoodObject['notMainProducts']['products'][notMainProduct][ProjectObject.productQuantity]
            const getGramsFromProductQuantity = ConvertProductQuantityToParentFoodQuantity(notMainProduct, productQuntity, parentFood)
            parentFoodQuantitySum += parentFoodObject['notMainProducts']['products'][notMainProduct][ProjectObject.parentFoodQuantity]
            parentFoodGramsByProductQuantity += getGramsFromProductQuantity
        }

        const distanceGramsFromProductQuantity = Math.abs(realTotalParentFoodGrams - parentFoodGramsByProductQuantity)
        const distanceParentQuntity = Math.abs(realTotalParentFoodGrams - parentFoodQuantitySum)

        return (
            distanceGramsFromProductQuantity < 1 && distanceParentQuntity < 1
        )

    } return true



}
const UpdateOtherParentFoodAfterChangingQuantity = (productToUpdate, parentFoodThatUpdated, newProductQuantity, parentsFoodObjectDivideToProducts) => {
    const parentsFoodObjectDivideToProductsCopy = Object.assign({}, parentsFoodObjectDivideToProducts);
    for (parentFood in parentsFoodObjectDivideToProductsCopy) {
        if (parentFood !== parentFoodThatUpdated) {
            const lastParentQuantity = parentsFoodObjectDivideToProductsCopy[parentFood][productToUpdate][ProjectObject.parentFoodQuantity]

            parentsFoodObjectDivideToProductsCopy[parentFood][productToUpdate][ProjectObject.productQuantity] =
                parentsFoodObjectDivideToProductsCopy[parentFoodThatUpdated][productToUpdate][ProjectObject.productQuantity]

            const currentParentFoodQuantityByNewProductQuantity = ConvertProductQuantityToParentFoodQuantity(
                productToUpdate,
                parentsFoodObjectDivideToProductsCopy[parentFoodThatUpdated][productToUpdate][ProjectObject.productQuantity],
                parentFood
            )


            parentsFoodObjectDivideToProductsCopy[parentFood][productToUpdate][ProjectObject.parentFoodQuantity] = currentParentFoodQuantityByNewProductQuantity
            const distanceOfGramsNumber = lastParentQuantity - currentParentFoodQuantityByNewProductQuantity
            const numberOfBelongProducts = GetNumberOfProcdutThatThisIsTheirMainParentFood(parentsFoodObjectDivideToProductsCopy, parentFood)
            const divideNumberOfGramsToBelongProducts = numberOfBelongProducts !== 0 ? distanceOfGramsNumber / (numberOfBelongProducts) : distanceOfGramsNumber


            for (product in parentsFoodObjectDivideToProductsCopy[parentFood]) {

                if (parentsFoodObjectDivideToProductsCopy[parentFood][product][ProjectObject.mainParentFood] === parentFood
                    && product !== productToUpdate) {
                    const productObject = parentsFoodObjectDivideToProductsCopy[parentFood][product]
                    const parentFoodGrams = lastParentQuantity < currentParentFoodQuantityByNewProductQuantity ?
                        productObject[ProjectObject.parentFoodQuantity] + divideNumberOfGramsToBelongProducts :
                        productObject[ProjectObject.parentFoodQuantity] - divideNumberOfGramsToBelongProducts


                    parentsFoodObjectDivideToProductsCopy[parentFood][product][ProjectObject.parentFoodQuantity] = parentFoodGrams

                    const newProductQuantity = ConvertQuantityOfParentFoodToProductQuantity(
                        product,
                        parentFood,
                        parentFoodGrams
                    )

                    parentsFoodObjectDivideToProductsCopy[parentFood][product][ProjectObject.productQuantity] = newProductQuantity
                }
            }

        }
    }

    return parentsFoodObjectDivideToProductsCopy
}

const AddProductToParentFood = (parentsFoodObjectDivideToProducts, productToInsert, totalgramsOfEachFoodType, parentFoodToInsertTo) => {
    const parentsFoodObjectDivideToProductsCopy = Object.assign({}, parentsFoodObjectDivideToProducts);
    const belongProducts = []
    const notBelongProducts = []
    // Calculate sum of grams of products that parentFoodToInsertTo is their main parent food
    // and divide the products to belong or nit belong arrays
    let sumGramsOfparentFoodProductThatNotBelongToIt = 0
    for (product in parentsFoodObjectDivideToProductsCopy[parentFoodToInsertTo]) {
        if (parentsFoodObjectDivideToProductsCopy[parentFoodToInsertTo][product][ProjectObject.mainParentFood]
            !== String(parentFoodToInsertTo)) {
            notBelongProducts.push(product)
            sumGramsOfparentFoodProductThatNotBelongToIt +=
                Number(parentsFoodObjectDivideToProductsCopy[parentFoodToInsertTo]
                [product][ProjectObject.parentFoodQuantity])
        }
        else {
            belongProducts.push(product)
        }
    }



    // Calculate the gap between total grams of parentFoodToInsertTo to the sum above 
    let diffBetweenTotalValue = Math.abs(totalgramsOfEachFoodType[parentFoodToInsertTo] - sumGramsOfparentFoodProductThatNotBelongToIt)


    // Check if parentFoodToInsertTo is main parent of the product we want to add to parentFoodToInsertTo
    const mainParentOfProductWeWantToAddTo = GetMainParentFood(productToInsert)

    let productObject = {}

    // If the parentFoodToInsertTo is the main product of the product we want to inserst to it 
    // and calculate how many grams get each prosuct that parentFoodToInsertTo is his main parent include new product 
    if (mainParentOfProductWeWantToAddTo === parentFoodToInsertTo) {
        const divideGrams = diffBetweenTotalValue / ((belongProducts.length) + 1)

        const addedProductQuantity = ConvertQuantityOfParentFoodToProductQuantity(productToInsert, parentFoodToInsertTo, divideGrams)

        productObject = CreateProductObject(productToInsert, mainParentOfProductWeWantToAddTo, divideGrams, addedProductQuantity)
        // Update others prosuct that parentFoodToInsertTo is his main parent by newDivivde grams
        for (let index = 0; index < belongProducts.length; index++) {
            const productQuantity = ConvertQuantityOfParentFoodToProductQuantity(belongProducts[index], parentFoodToInsertTo, divideGrams)

            parentsFoodObjectDivideToProductsCopy[parentFoodToInsertTo][belongProducts[index]][ProjectObject.productQuantity] = productQuantity
            parentsFoodObjectDivideToProductsCopy[parentFoodToInsertTo][belongProducts[index]][ProjectObject.parentFoodQuantity] = divideGrams
        }


    } else {
        // Get the quantity from main product parent food and covert it to quantity of parent food to insert 
        const getProductQuantityFromMainParent = parentsFoodObjectDivideToProductsCopy[mainParentOfProductWeWantToAddTo][productToInsert][ProjectObject.productQuantity]

        const convertProductQuantityToParentFoodQuantity = ConvertProductQuantityToParentFoodQuantity(productToInsert, getProductQuantityFromMainParent, parentFoodToInsertTo)




        productObject = CreateProductObject(productToInsert, mainParentOfProductWeWantToAddTo, convertProductQuantityToParentFoodQuantity, getProductQuantityFromMainParent)



        // check if there is free place to insert this product with this quantity to parent food to insert 
        let sumCurrentGramsInUse = 0
        for (product in parentsFoodObjectDivideToProductsCopy[parentFoodToInsertTo]) {

            const gramsParentFoodQuantity = parentsFoodObjectDivideToProductsCopy[parentFoodToInsertTo][product][ProjectObject.parentFoodQuantity]
            sumCurrentGramsInUse += Number(gramsParentFoodQuantity)

        }


        const freeSpaceGrams = totalgramsOfEachFoodType[parentFoodToInsertTo] - sumCurrentGramsInUse

        // If there isn't free space to insert the product with this number of grams, decrese the number of grams 
        // we want to insert from the number that divide to all belong products 

        if (freeSpaceGrams !== convertProductQuantityToParentFoodQuantity) {

            const totalGramsTOAdd = convertProductQuantityToParentFoodQuantity

            const divideGramsAboveToNumberOfBelongProducts = (belongProducts.length !== 0) ? totalGramsTOAdd / belongProducts.length : totalGramsTOAdd

            for (let index = 0; index < belongProducts.length; index++) {
                const currentProduct = belongProducts[index]

                const changeCurremtParentFoodQuantity =
                    freeSpaceGrams < convertProductQuantityToParentFoodQuantity ?
                        Number(parentsFoodObjectDivideToProductsCopy[parentFoodToInsertTo][currentProduct][ProjectObject.parentFoodQuantity]) + divideGramsAboveToNumberOfBelongProducts :
                        Number(parentsFoodObjectDivideToProductsCopy[parentFoodToInsertTo][currentProduct][ProjectObject.parentFoodQuantity]) - divideGramsAboveToNumberOfBelongProducts


                parentsFoodObjectDivideToProductsCopy[parentFoodToInsertTo][currentProduct][ProjectObject.parentFoodQuantity] = changeCurremtParentFoodQuantity
                const currentProductQuantity = ConvertQuantityOfParentFoodToProductQuantity(currentProduct, parentFoodToInsertTo, changeCurremtParentFoodQuantity)
                parentsFoodObjectDivideToProductsCopy[parentFoodToInsertTo][currentProduct][ProjectObject.productQuantity] = currentProductQuantity
                const updatedObject = UpdateOtherParentFoodAfterChangingQuantity(currentProduct, parentFoodToInsertTo, currentProductQuantity, parentsFoodObjectDivideToProductsCopy)
                Object.assign(parentsFoodObjectDivideToProductsCopy, updatedObject)

            }

        }


    }

    parentsFoodObjectDivideToProductsCopy[String(parentFoodToInsertTo)][String(productToInsert)] = productObject
    return parentsFoodObjectDivideToProductsCopy
}
const fixTheSpaceBetweenGramsWeWantToGramsWeGet = (parentsFoodObject, parentFood, totalgramsOfEachFoodType) => {
    const parentsFoodObjectCopy = Object.assign({}, parentsFoodObject);
    let sumGramsNotMainProduct = 0
    for (notMainProduct in parentsFoodObjectCopy[parentFood]['notMainProducts']['products']) {
        const mainParentOfCurrentNotMainProduct = GetMainParentFood(notMainProduct)
        const QuantityOfNotMainProductInHisMain = parentsFoodObjectCopy[mainParentOfCurrentNotMainProduct]['mainProducts']['products'][notMainProduct][ProjectObject.productQuantity]
        const notMainProductQuantityInCurrentPerantFood = parentsFoodObjectCopy[parentFood]['notMainProducts']['products'][notMainProduct][ProjectObject.productQuantity]
        if (QuantityOfNotMainProductInHisMain !== notMainProductQuantityInCurrentPerantFood) {
            parentsFoodObjectCopy[parentFood]['notMainProducts']['products'][notMainProduct][ProjectObject.productQuantity] = QuantityOfNotMainProductInHisMain
            const changeDistance = Math.abs(QuantityOfNotMainProductInHisMain - notMainProductQuantityInCurrentPerantFood)
            const convertDistanceToParentQuantity = ConvertProductQuantityToParentFoodQuantity(notMainProduct, changeDistance, parentFood)

        }
        const convertToParentFoodQuantity = ConvertProductQuantityToParentFoodQuantity(notMainProduct, QuantityOfNotMainProductInHisMain, parentFood)
        sumGramsNotMainProduct += Number(convertToParentFoodQuantity)
    }

    const numberofMainProducts = Object.keys(parentsFoodObjectCopy[parentFood]['mainProducts']['products']).length;
    const gapGrams = Math.abs(totalgramsOfEachFoodType[parentFood] - sumGramsNotMainProduct)
    const numberOfGramsThatEachMainProductGet = gapGrams / numberofMainProducts

    for (mainProduct in parentsFoodObjectCopy[parentFood]['mainProducts']['products']) {
        const currentParentFoodQuantity = parentsFoodObjectCopy[parentFood]['mainProducts']['products'][mainProduct][ProjectObject.parentFoodQuantity]
        const newParentFoodQuantity = totalgramsOfEachFoodType[parentFood] > sumGramsNotMainProduct ?
            currentParentFoodQuantity + numberOfGramsThatEachMainProductGet : currentParentFoodQuantity - numberOfGramsThatEachMainProductGet

        const newMainProductQuantity = ConvertQuantityOfParentFoodToProductQuantity(mainProduct, parentFood, newParentFoodQuantity)
        parentsFoodObjectCopy[parentFood]['mainProducts']['products'][mainProduct][ProjectObject.parentFoodQuantity] = newParentFoodQuantity
        parentsFoodObjectCopy[parentFood]['mainProducts']['products'][mainProduct][ProjectObject.productQuantity] = newMainProductQuantity

        parentsFoodObjectCopy[parentFood]['mainProducts']['gramUse'] = totalgramsOfEachFoodType[parentFood] > sumGramsNotMainProduct ?
            parentsFoodObjectCopy[parentFood]['mainProducts']['gramUse'] + numberOfGramsThatEachMainProductGet :
            parentsFoodObjectCopy[parentFood]['mainProducts']['gramUse'] - numberOfGramsThatEachMainProductGet

    }

    return parentsFoodObjectCopy


}

const checkIfParentsFoodObjectIsOrder = (parentsFoodObjectDivideToProducts, totalgramsOfEachFoodType) => {
    let sumGrams = 0
    for (const parentFood in parentsFoodObjectDivideToProducts) {
        const numberOfMainProducts = Object.keys(parentsFoodObjectDivideToProducts[parentFood]['mainProducts']['products']).length
        if (numberOfMainProducts !== 0) {
            for (const mainProduct in parentsFoodObjectDivideToProducts[parentFood]['mainProducts']['products']) {

                const productObject = parentsFoodObjectDivideToProducts[parentFood]['mainProducts']['products'][mainProduct]
                const convatorNumber = (VALUES[mainProduct][parentFood]) / 100

                const currrentQuantity = productObject[ProjectObject.productQuantity]

                const getGramsFromProductQuantity = convatorNumber * currrentQuantity

                sumGrams += getGramsFromProductQuantity


            }

            for (notMainProduct in parentsFoodObjectDivideToProducts[parentFood]['notMainProducts']['products']) {
                const productObject = parentsFoodObjectDivideToProducts[parentFood]['notMainProducts']['products'][notMainProduct]
                const getGramsFromProductQuantity = (((VALUES[notMainProduct][parentFood]) / 100) * (productObject[ProjectObject.productQuantity]))
                sumGrams += getGramsFromProductQuantity
            }



            if ((Math.abs(totalgramsOfEachFoodType[parentFood] - sumGrams)) > 0.5) {
                return false
            }
        }
    }

    return true
}

const AddProductToMainProducts = (mainParentFoodObject, mainParentFood, productToInsert) => {
    const mainParentFoodObjectCopy = Object.assign({}, mainParentFoodObject);
    const useGrams = mainParentFoodObjectCopy['mainProducts']['gramUse']
    const numberOfMainProducts = Object.keys(mainParentFoodObjectCopy['mainProducts']['products']).length;
    const gramsToEachMainProduct = useGrams / (numberOfMainProducts + 1)
    const productObject = CreateProductObject(productToInsert, mainParentFood, 0, 0)
    mainParentFoodObjectCopy['mainProducts']['products'][productToInsert] = productObject
    for (mainProduct in mainParentFoodObjectCopy['mainProducts']['products']) {
        mainParentFoodObjectCopy['mainProducts']['products'][mainProduct][ProjectObject.parentFoodQuantity] = gramsToEachMainProduct
        const getProductQuantity = ConvertQuantityOfParentFoodToProductQuantity(productToInsert, mainParentFood, gramsToEachMainProduct)
        mainParentFoodObjectCopy['mainProducts']['products'][mainProduct][ProjectObject.productQuantity] = getProductQuantity
    }
    return mainParentFoodObjectCopy
}

const AddProductToNotMainProducts = (notMainParentFoodObject, notMainParentFoodName, mainParentFoodObject, mainParentFood, productToInsert) => {
    const notMainParentFoodObjectCopy = Object.assign({}, notMainParentFoodObject);
    const productToInsertQuantity = mainParentFoodObject['mainProducts']['products'][productToInsert][ProjectObject.productQuantity]


    const productObject = CreateProductObject(productToInsert, mainParentFood, 0, 0)
    notMainParentFoodObjectCopy['notMainProducts']['products'][productToInsert] = productObject

    notMainParentFoodObjectCopy['notMainProducts']['products'][productToInsert][ProjectObject.productQuantity] = productToInsertQuantity
    const getProductParentFoodQuantity = ConvertProductQuantityToParentFoodQuantity(productToInsert, productToInsertQuantity, notMainParentFoodName)
    notMainParentFoodObjectCopy['notMainProducts']['products'][productToInsert][ProjectObject.parentFoodQuantity] = getProductParentFoodQuantity


    const newNotParentFoodProductsGramUse = notMainParentFoodObjectCopy['notMainProducts']['gramUse'] + getProductParentFoodQuantity
    notMainParentFoodObjectCopy['notMainProducts']['gramUse'] = newNotParentFoodProductsGramUse

    notMainParentFoodObjectCopy['mainProducts']['gramUse'] -= getProductParentFoodQuantity


    return notMainParentFoodObjectCopy
}

const UpdateProductInTwoOtherParentFood = (parentfoodThetUpdated, productToUpdate, parentsFoodObjectDivideToProducts) => {
    const parentsFoodObjectDivideToProductsCopy = Object.assign({}, parentsFoodObjectDivideToProducts);
    const productQuantity = parentsFoodObjectDivideToProductsCopy[parentfoodThetUpdated]['mainProducts']['products'][productToUpdate][ProjectObject.productQuantity]
    for (const currentParentFood in parentsFoodObjectDivideToProductsCopy) {
        if (currentParentFood !== parentfoodThetUpdated) {
            const lastParentQuantity = parentsFoodObjectDivideToProductsCopy[currentParentFood]['notMainProducts']['products'][productToUpdate][ProjectObject.parentFoodQuantity]
            const newParentQuantity = ConvertProductQuantityToParentFoodQuantity(productToUpdate, productQuantity, currentParentFood)
            parentsFoodObjectDivideToProductsCopy[currentParentFood]['notMainProducts']['products'][productToUpdate][ProjectObject.productQuantity] = productQuantity
            parentsFoodObjectDivideToProductsCopy[currentParentFood]['notMainProducts']['products'][productToUpdate][ProjectObject.parentFoodQuantity] = newParentQuantity
            const distanceBetweenLastParentQuantityToNewParentQuantity = Math.abs(lastParentQuantity - newParentQuantity)
            const currentGramUse = parentsFoodObjectDivideToProductsCopy[currentParentFood]['notMainProducts']['gramUse']
            parentsFoodObjectDivideToProductsCopy[currentParentFood]['notMainProducts']['gramUse'] =
                lastParentQuantity > newParentQuantity ?
                    currentGramUse - distanceBetweenLastParentQuantityToNewParentQuantity :
                    currentGramUse + distanceBetweenLastParentQuantityToNewParentQuantity
            const differntBetweenLatGramToNew = currentGramUse - (parentsFoodObjectDivideToProductsCopy[currentParentFood]['notMainProducts']['gramUse'])
            if (differntBetweenLatGramToNew < 0) {
                parentsFoodObjectDivideToProductsCopy[currentParentFood]['mainProducts']['gramUse'] - Math.abs(differntBetweenLatGramToNew)
            } else {
                parentsFoodObjectDivideToProductsCopy[currentParentFood]['mainProducts']['gramUse'] + Math.abs(differntBetweenLatGramToNew)
            }


        }
    }
    return parentsFoodObjectDivideToProductsCopy
}

const OrderUnorderdParentFood = (parentFoodToOrder, parentsFoodObjectDivideToProducts, totalgramsOfEachFoodType) => {
    let parentsFoodObjectDivideToProductsCopy = Object.assign({}, parentsFoodObjectDivideToProducts)
    const sumGrams = parentsFoodObjectDivideToProductsCopy[parentFoodToOrder]['mainProducts']['gramUse'] +
        parentsFoodObjectDivideToProductsCopy[parentFoodToOrder]['notMainProducts']['gramUse']

    const distanceFromRealTotal = Math.abs(totalgramsOfEachFoodType[parentFoodToOrder] - sumGrams)
    const numberOfMainProducts = Object.keys(parentsFoodObjectDivideToProductsCopy[parentFoodToOrder]['mainProducts']['products']).length
    const numberOfGramsToEachMainProduct = numberOfMainProducts > 0 ? distanceFromRealTotal / numberOfMainProducts : distanceFromRealTotal
    for (mainProduct in parentsFoodObjectDivideToProductsCopy[parentFoodToOrder]['mainProducts']['products']) {
        const lastParentFoodQuantity = parentsFoodObjectDivideToProductsCopy[parentFoodToOrder]['mainProducts']['products'][mainProduct][ProjectObject.parentFoodQuantity]
        parentsFoodObjectDivideToProductsCopy[parentFoodToOrder]['mainProducts']['products'][mainProduct][ProjectObject.parentFoodQuantity] =
            totalgramsOfEachFoodType[parentFoodToOrder] > sumGrams ?
                lastParentFoodQuantity + numberOfGramsToEachMainProduct :
                lastParentFoodQuantity - numberOfGramsToEachMainProduct
        const newParentFoodQuantity = parentsFoodObjectDivideToProductsCopy[parentFoodToOrder]['mainProducts']['products'][mainProduct][ProjectObject.parentFoodQuantity]
        const lastUseGramsOfMainProducts = parentsFoodObjectDivideToProductsCopy[parentFoodToOrder]['mainProducts']['gramUse']
        parentsFoodObjectDivideToProductsCopy[parentFoodToOrder]['mainProducts']['gramUse'] =
            newParentFoodQuantity > lastParentFoodQuantity ?
                lastUseGramsOfMainProducts + numberOfGramsToEachMainProduct :
                lastParentFoodQuantity - numberOfGramsToEachMainProduct
        const newParentFoodQunatity = parentsFoodObjectDivideToProductsCopy[parentFoodToOrder]['mainProducts']['products'][mainProduct][ProjectObject.parentFoodQuantity]
        const newProductQuantity = ConvertQuantityOfParentFoodToProductQuantity(mainProduct, parentFoodToOrder, newParentFoodQunatity)
        parentsFoodObjectDivideToProductsCopy[parentFoodToOrder]['mainProducts']['products'][mainProduct][ProjectObject.productQuantity] = newProductQuantity
        const parentFoodObjectAfterUpdateTwoOtherParentFood =
            UpdateProductInTwoOtherParentFood(parentFoodToOrder, mainProduct, parentsFoodObjectDivideToProductsCopy)
        Object.assign(parentsFoodObjectDivideToProductsCopy, parentFoodObjectAfterUpdateTwoOtherParentFood);
    }
    return parentsFoodObjectDivideToProductsCopy
}

const GetParentObject = (parentFoodText, carbohydrates, fats, protains) => {
    switch (parentFoodText) {
        case FoodTypes.carbohydrates: {
            return carbohydrates
        }
        case FoodTypes.fats: {
            return fats
        }
        case FoodTypes.protains: {
            return protains
        }
    }
}
const calcualteCurrentGrams = (parentFoodObject, parentFood) => {
    let sumGrams = 0
    for (mainProduct in parentFoodObject['mainProducts']['products']) {
        const mainProductQuantity = parentFoodObject['mainProducts']['products'][mainProduct][ProjectObject.productQuantity]
        const parentQuantityFromProductQuantity = ConvertProductQuantityToParentFoodQuantity(mainProduct, mainProductQuantity, parentFood)
        sumGrams += parentQuantityFromProductQuantity
    }

    for (notMainProduct in parentFoodObject['notMainProducts']['products']) {
        const notMainProductQuantity = parentFoodObject['notMainProducts']['products'][notMainProduct][ProjectObject.productQuantity]
        const parentQuantityFromProductQuantity = ConvertProductQuantityToParentFoodQuantity(notMainProduct, notMainProductQuantity, parentFood)
        sumGrams += parentQuantityFromProductQuantity
    }

    return sumGrams
}
const UpdateMainProductByDistanceFromRealTotal = (parentFoodObject, parentFood, realTotalGramsParentFood, currentSumGrams, numberOfGramsThatEachMainProductGet) => {
    const parentsFoodObjectCopy = Object.assign({}, parentFoodObject);
    for (mainProduct in parentFoodObject['mainProducts']['products']) {
        const currentProductQuantity = parentsFoodObjectCopy['mainProducts']['products'][mainProduct][ProjectObject.productQuantity]
        const currentParentFoodQuantity = ConvertProductQuantityToParentFoodQuantity(mainProduct, currentProductQuantity, parentFood)
        const newParentFoodQuantity = realTotalGramsParentFood > currentSumGrams ?
            currentParentFoodQuantity + numberOfGramsThatEachMainProductGet : currentParentFoodQuantity - numberOfGramsThatEachMainProductGet

        const newMainProductQuantity = ConvertQuantityOfParentFoodToProductQuantity(mainProduct, parentFood, newParentFoodQuantity)
        parentsFoodObjectCopy['mainProducts']['products'][mainProduct][ProjectObject.parentFoodQuantity] = newParentFoodQuantity
        parentsFoodObjectCopy['mainProducts']['products'][mainProduct][ProjectObject.productQuantity] = newMainProductQuantity

        parentsFoodObjectCopy['mainProducts']['gramUse'] = realTotalGramsParentFood > currentSumGrams ?
            parentsFoodObjectCopy['mainProducts']['gramUse'] + numberOfGramsThatEachMainProductGet :
            parentsFoodObjectCopy['mainProducts']['gramUse'] - numberOfGramsThatEachMainProductGet

    }

}
const OrderParentFoodObject = (parentFoodObject, parentFood, realTotalGramsOfParentFood) => {
    const parentsFoodObjectCopy = Object.assign({}, parentFoodObject);
    const currentParentFoodGram = calcualteCurrentGrams(parentsFoodObjectCopy, parentFood)
    const numberOfMainProducts = Object.keys(parentsFoodObjectCopy['mainProducts']['products']).length
    const distanceBetweenRealTotalFoodType = Math.abs(realTotalGramsOfParentFood - currentParentFoodGram)
    const numberOfGramsThatEachMainProductGet = distanceBetweenRealTotalFoodType / numberOfMainProducts

}

const CreateRowInMatrixForParentFood = (parentFoodObject, parentName) => {
    const newArray = []
    for (mainProduct in parentFoodObject['mainProducts']['products']) {
        const newArrayCellValue = (VALUES[mainProduct][parentName]) / 100
        newArray.push(newArrayCellValue)
    }
    return newArray
}
const CreateMatrixOfArrayOfFood = (productsValuesObject, totalCarbohydrates, totalFats, totalProtains) => {
    let carbohydrates = [], fats = [], protains = []
    for (let product in productsValuesObject) {
        const productValues = productsValuesObject[product]

        const carbohydratesValueDivideBy100 = productValues[FoodTypes.carbohydrates] / 100
        const fatsValueDivideBy100 = productValues[FoodTypes.fats] / 100
        const protainsValueDivideBy100 = productValues[FoodTypes.protains] / 100
        carbohydrates.push(carbohydratesValueDivideBy100)
        fats.push(fatsValueDivideBy100)
        protains.push(protainsValueDivideBy100)
    }

    carbohydrates.push(totalCarbohydrates)
    fats.push(totalFats)
    protains.push(totalProtains)
    const matrix = [carbohydrates, fats, protains]
    return matrix


    // for (let product = 0; product < arrayOfFoproductsValuesObjectod.length; product++) {
    //     const carbohydratesValueDivideBy100 = (VALUES[arrayOfFood[product]][FoodTypes.carbohydrate]) / 100
    //     const fatsValueDivideBy100 = (VALUES[arrayOfFood[product]][FoodTypes.fats]) / 100
    //     const protainsValueDivideBy100 = (VALUES[arrayOfFood[product]][FoodTypes.protains]) / 100
    //     carbohydrates.push(carbohydratesValueDivideBy100)
    //     fats.push(fatsValueDivideBy100)
    //     protains.push(protainsValueDivideBy100)
    //}

}
const GenerateNumberExceptNumberFromArray = (numbersNotInclud, min, max) => {
    let result = null
    do {
        result = Math.floor(Math.random() * (max - min) + min);
    } while (numbersNotInclud.includes(result));

    return result
}
const checkIfThersNegativeValue = (dependedMatrix, freeValues) => {
    const depednentMatrixCopy = [...dependedMatrix]
    for (let index = 0; index < depednentMatrixCopy.length; index++) {
        for (let rightPartIndex = 0; rightPartIndex < depednentMatrixCopy[index]["rightPartOfEquation"].length; rightPartIndex++) {
            const variable = depednentMatrixCopy[index]["rightPartOfEquation"][rightPartIndex]["variable"]
            if (variable !== "without") {
                const number = freeValues[variable]
            }
        }

    }
}
const CalculateValuesOfVaribles = (matrix) => {
    let variblesResult = {}
    const depednentArray = matrix["dependet"]
    for (let depednentArrayIndex = 0; depednentArrayIndex < depednentArray.length; depednentArrayIndex++) {
        const dependedVaribleRightPart = depednentArray[depednentArrayIndex]["rightPartOfEquation"]
        let sum = 0
        const variableName = depednentArray[depednentArrayIndex]["leftPartOfEquation"][0]["variable"]
        for (let rightPartIndex = 0; rightPartIndex < depednentArray[depednentArrayIndex]["rightPartOfEquation"].length; rightPartIndex++) {
            let value = 0
            if (dependedVaribleRightPart[rightPartIndex]["variable"] !== "without") {
                value = (dependedVaribleRightPart[rightPartIndex]["variable"]) * (dependedVaribleRightPart[rightPartIndex]["number"])
            }
            else {
                value = dependedVaribleRightPart[rightPartIndex]["number"]
            }
            sum += value
        }
        variblesResult[variableName] = sum
    }

    const freeArray = matrix["free"]
    for (let freeArrayIndex = 0; freeArrayIndex < freeArray.length; freeArrayIndex++) {
        const variableName = freeArray[freeArrayIndex]["leftPartOfEquation"][0]["variable"]
        const varibleValue = freeArray[freeArrayIndex]["rightPartOfEquation"][0]["number"]
        variblesResult[variableName] = varibleValue
    }
    return variblesResult
}
const convertFromVariblesToFood = (result, productsValueObject) => {
    const foodValues = {}
    let resultCopy = result
    const productsArray = []
    for (product in productsValueObject) {
        productsArray.push(product)
    }

    for (let productIndex = 0; productIndex < productsArray.length; productIndex++) {
        const value = resultCopy["X" + (productIndex + 1)]
        foodValues[productsArray[productIndex]] = value
    }
    return foodValues
}
const IsTrueValues = (food, totalCarbohydrates, totalFats, totalProtains) => {
    let currentCarbohydrateGrams = 0, currentFatsGrams = 0, currentProtainsGrams = 0
    for (product in food) {
        const carbohydrateGrams = ConvertProductQuantityToParentFoodQuantity(
            product,
            food[product],
            FoodTypes.carbohydrates
        )

        const fatsGrams = ConvertProductQuantityToParentFoodQuantity(
            product,
            food[product],
            FoodTypes.fats
        )

        const protainsGrams = ConvertProductQuantityToParentFoodQuantity(
            product,
            food[product],
            FoodTypes.protains
        )

        currentCarbohydrateGrams += carbohydrateGrams
        currentFatsGrams += fatsGrams
        currentProtainsGrams += protainsGrams
    }

    // console.log(currentCarbohydrateGrams)
    // console.log(currentFatsGrams)
    // console.log(currentProtainsGrams)

    return (
        (Math.abs(totalCarbohydrates - currentCarbohydrateGrams) < 0.1) &&
        (Math.abs(totalFats - currentFatsGrams) < 0.1) &&
        (Math.abs(totalProtains - currentProtainsGrams) < 0.1)
    )
}
const TakeEachDependedArrayEqualToZeroAndCreateMatrix = (dependedArray) => {
    const newMatrix = []

    let dependedArrayCopy = [...dependedArray]
    for (let dependedValIndex = 0; dependedValIndex < dependedArrayCopy.length; dependedValIndex++) {
        let freeNumbersInEquation = 0
        let arrayOfEquation = []
        for (let rightPartEquationIndex = 0; rightPartEquationIndex < dependedArrayCopy[dependedValIndex]["rightPartOfEquation"].length; rightPartEquationIndex++) {
            const item = dependedArrayCopy[dependedValIndex]["rightPartOfEquation"][rightPartEquationIndex]
            if (item["variable"] === "without") {
                freeNumbersInEquation -= item["number"]
            } else {
                arrayOfEquation.push(item["number"])
            }
        }
        arrayOfEquation.push(freeNumbersInEquation)
        newMatrix.push(arrayOfEquation)
    }

    return newMatrix
}
const CheckForValuesOfFreeValThatCauseToDependedBeZero = (dependedArray) => {
    const newMatrix = TakeEachDependedArrayEqualToZeroAndCreateMatrix(dependedArray)
    const solveNewMatrix = EquationSystemSolver(newMatrix)
    const solveMatrixWithValuesInFreeVaribles = putValuesInstedOfFreeVaribles(solveNewMatrix, 50, 200)
    const valueToEachVariable = CalculateValuesOfVaribles(solveMatrixWithValuesInFreeVaribles)
    console.log(valueToEachVariable)
    return valueToEachVariable


}
const MaxValueOfResultVaribles = (resultObj) => {
    let valuesArray = []
    for (item in resultObj) {
        valuesArray.push(resultObj[item])
    }
    const maxValue = Math.max(...valuesArray)
    return maxValue
}
const CheckIfTheresNegativeValue = (values) => {
    let negatives = []
    for (item in values) {
        if (values[item] <= 0) {
            const keyProblem = { variable: item, number: values[item] }
            negatives.push(keyProblem)
        }
    }
    return negatives
}

const putValuesInstedOfFreeVaribles = (solveMatrix, minGenerateNumber, maxGenerateNumber) => {
    let freeVariblesValues = []
    let solveMatrixCopy = { ...solveMatrix }
    let freeVariblesArray = solveMatrixCopy["free"]
    for (let freeVarible = 0; freeVarible < freeVariblesArray.length; freeVarible++) {
        generateNumberToPutInVarible =
            GenerateNumberExceptNumberFromArray(
                freeVariblesValues,
                minGenerateNumber,
                maxGenerateNumber
            )
        solveMatrixCopy["free"][freeVarible]["rightPartOfEquation"][0]["number"] = generateNumberToPutInVarible
        freeVariblesValues.push(generateNumberToPutInVarible)
    }

    let dependentVariblesArray = solveMatrixCopy["dependet"]
    for (let dependentVarible = 0; dependentVarible < dependentVariblesArray.length; dependentVarible++) {
        for (let freeVarible = 0; freeVarible < freeVariblesArray.length; freeVarible++) {
            const rightEquationPart = solveMatrixCopy["dependet"][dependentVarible]["rightPartOfEquation"]
            for (let rightPartVarible = 0; rightPartVarible < rightEquationPart.length; rightPartVarible++) {
                if (rightEquationPart[rightPartVarible]['variable'] === solveMatrixCopy["free"][freeVarible]["leftPartOfEquation"][0]['variable']) {
                    solveMatrixCopy["dependet"][dependentVarible]["rightPartOfEquation"][rightPartVarible]["variable"] =
                        solveMatrixCopy["free"][freeVarible]["rightPartOfEquation"][0]['number']
                }

            }
        }
    }


    return solveMatrixCopy

}
const putValuesInstedOfFreeVaribles2 = (solveMatrix, minGenerateNumber, maxGenerateNumber, value) => {
    let freeVariblesValues = []
    let solveMatrixCopy = { ...solveMatrix }
    let freeVariblesArray = solveMatrixCopy["free"]
    for (let freeVarible = 0; freeVarible < freeVariblesArray.length; freeVarible++) {
        // generateNumberToPutInVarible =
        //     GenerateNumberExceptNumberFromArray(
        //         freeVariblesValues,
        //         minGenerateNumber,
        //         maxGenerateNumber
        //     )
        solveMatrixCopy["free"][freeVarible]["rightPartOfEquation"][0]["number"] = value
        freeVariblesValues.push(value)
    }

    let dependentVariblesArray = solveMatrixCopy["dependet"]
    for (let dependentVarible = 0; dependentVarible < dependentVariblesArray.length; dependentVarible++) {
        for (let freeVarible = 0; freeVarible < freeVariblesArray.length; freeVarible++) {
            const rightEquationPart = solveMatrixCopy["dependet"][dependentVarible]["rightPartOfEquation"]
            for (let rightPartVarible = 0; rightPartVarible < rightEquationPart.length; rightPartVarible++) {
                if (rightEquationPart[rightPartVarible]['variable'] === solveMatrixCopy["free"][freeVarible]["leftPartOfEquation"][0]['variable']) {
                    solveMatrixCopy["dependet"][dependentVarible]["rightPartOfEquation"][rightPartVarible]["variable"] =
                        solveMatrixCopy["free"][freeVarible]["rightPartOfEquation"][0]['number']
                }

            }
        }
    }

    return solveMatrixCopy

}

const CalculateNumberToPutInFreeVriables = (dependedArray) => {
    const resultsobj = []
    const resultsNumber = []


    let dependedArrayCopy = [...dependedArray]
    for (let dependedValIndex = 0; dependedValIndex < dependedArrayCopy.length; dependedValIndex++) {
        let freeNumbersInEquation = 0
        let sumNumbers = 0
        for (let rightPartEquationIndex = 0; rightPartEquationIndex < dependedArrayCopy[dependedValIndex]["rightPartOfEquation"].length; rightPartEquationIndex++) {
            const item = dependedArrayCopy[dependedValIndex]["rightPartOfEquation"][rightPartEquationIndex]
            if (item["variable"] === "without") {
                freeNumbersInEquation -= item["number"]
            } else {
                sumNumbers += item["number"]
            }
        }

        if (sumNumbers < 0) {
            const number = freeNumbersInEquation / sumNumbers
            const obj = {
                value: number,
                sign: "lower than"
            }
            resultsobj.push(obj)
            resultsNumber.push(number)
        } else {
            const number = freeNumbersInEquation / sumNumbers
            const obj = {
                value: number,
                sign: "grater than"
            }
            resultsobj.push(obj)
            resultsNumber.push(number)

        }
    }

    let min = null
    let max = null
    for (let index = 0; index < resultsobj.length; index++) {
        const sign = resultsobj[index]["sign"]
        const number = resultsobj[index]["value"]

        if (sign === "lower than" && min === null || sign === "lower than" && number < min) {
            min = number
        }

        if (sign === "grater than" && max === null || sign === "grater than" && number > max) {
            max = number
        }

    }

    if (min === 0 && max !== 0) {
        return max + 20
    }
    if (min !== 0 && max === 0) {
        return min - 20
    }
    if (min !== 0 && max !== 0) {
        return (min + max) / 2
    }

}
const GetNumOfFreeVar = (solveMatrix) => {
    let freeNumber = 0
    let variables = {
        negative: { sum: 0 },
        positive: { sum: 0 }
    }
    const solveMatrixCopy = Object.assign({}, solveMatrix);
    const dependents = solveMatrixCopy["dependet"]

    const first = dependents[0]["rightPartOfEquation"]
    first.forEach((item, index) => {
        let itemVariable = item["variable"]
        let itemNumber = item["number"]

        if (itemVariable === "without") {
            freeNumber += itemNumber
        } else {
            if (itemNumber > 0) {
                variables["positive"][itemVariable] = itemNumber
                variables["positive"]["sum"] += itemNumber
            } else {
                variables["negative"][itemVariable] = itemNumber
                variables["negative"]["sum"] += itemNumber
            }
        }
    })

    const valueOfFreeVarAfterMoveToOtherSide = (-1) * freeNumber
    const totalSum = variables["negative"]["sum"] + variables["positive"]["sum"]

    const negativeSum = variables["negative"]["sum"]
    const positiveSum = variables["positive"]["sum"]

    if (valueOfFreeVarAfterMoveToOtherSide < 0 && totalSum > 0) {
        const multiplyPositiveByNumber = positiveSum * 10
        const valueOfPositiveNumberAfterMoveToOpositeSide = multiplyPositiveByNumber * (-1)
        const valueOfVarOfNegativeValue = valueOfPositiveNumberAfterMoveToOpositeSide / negativeSum

        const positiveVarValue = 10
        const negativeVarValue = valueOfVarOfNegativeValue
        const valueOfVariables = {}
        const nagatives = variables["negative"]
        const positives = variables["positive"]
        for (item in nagatives) {
            if (item !== "sum") {
                valueOfVariables[item] = negativeVarValue
            }
        }

        for (item in positives) {
            if (item !== "sum") {
                valueOfVariables[item] = positiveVarValue
            }
        }

        console.log(valueOfVariables)







    } else if ((valueOfFreeVarAfterMoveToOtherSide > 0 && totalSum < 0)) {

    } else {

    }




}
export const DivideFoodTypesValuesToProducts = async (productsValuesObject, totalgramsOfEachFoodType) => {
    let min = 50
    let max = 70

    const matrix = CreateMatrixOfArrayOfFood(
        productsValuesObject,
        totalgramsOfEachFoodType[FoodTypes.carbohydrates],
        totalgramsOfEachFoodType[FoodTypes.fats],
        totalgramsOfEachFoodType[FoodTypes.protains]
    )
    const solveMatrix = EquationSystemSolver(matrix)


    const numInstedOfFreeVar = GetNumOfFreeVar(solveMatrix)



    const newVar = CalculateNumberToPutInFreeVriables(solveMatrix["dependet"])

    const solveMatrixWithValuesInFreeVaribles = putValuesInstedOfFreeVaribles2(solveMatrix, min, max, newVar)
    const getValueOfEachVarible = CalculateValuesOfVaribles(solveMatrixWithValuesInFreeVaribles, Object.keys(productsValuesObject).length)
    const putNameOfFoodToEachVariable = convertFromVariblesToFood(getValueOfEachVarible, productsValuesObject)
    // const checkIfTrueValues = IsTrueValues(putNameOfFoodToEachVariable, totalgramsOfEachFoodType[FoodTypes.carbohydrate], totalgramsOfEachFoodType[FoodTypes.fats], totalgramsOfEachFoodType[FoodTypes.protains])

    return putNameOfFoodToEachVariable

}














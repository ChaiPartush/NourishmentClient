import { valuesOfFoodByHundredGrams } from '../../constants/Logics/CalculateQuantityOfEachFoodConsts'
import { FoodTypes } from '../../constants/Logics/FoodTypes';


export const CalculateFoodTypeProduct = (dividePrductsToTheirFoodTypeObject, productName, productType, totalFoodTypesValues) => {
    const dividePrductsToTheirFoodTypeObjectCopy = Object.assign({}, dividePrductsToTheirFoodTypeObject);
    const foodValues = valuesOfFoodByHundredGrams.productName;
    if (productType === FoodTypes.vitamins) {
        const productObject = {
            name: productName
        }
        dividePrductsToTheirFoodTypeObjectCopy.productType.push(productObject)

    }
    else if (dividePrductsToTheirFoodTypeObjectCopy.productType.length === 0) {
        convertNumberBetweengramsToProductQuantity = foodValues.productType / 100;
        foodQuantity = totalFoodTypesValues.productType / convertNumberBetweengramsToProductQuantity;
        const productObject = {
            name: productName,
            gramOfFoodType: totalFoodTypesValues.productType,
            quantity: foodQuantity
        }
        dividePrductsToTheirFoodTypeObjectCopy.productType.push(productObject)
    } else {
        const newNumbersOfItems = dividePrductsToTheirFoodTypeObjectCopy.productType.length + 1;
        const newGramsOfFoodType = totalFoodTypesValues.productType / newNumbersOfItems;
        const productObject = {
            name: productName,
            gramOfFoodType: 0,
            quantity: 0
        }
        dividePrductsToTheirFoodTypeObjectCopy.productType.push(productObject)
        for (let index = 0; index < newNumbersOfItems; index++) {
            const product = dividePrductsToTheirFoodTypeObjectCopy.productType[index]
            product.gramOfFoodType = newGramsOfFoodType;
            const convertNumberBetweengramsToProductQuantity = (valuesOfFoodByHundredGrams.product.name.productType) / 100
            product.quantity = (product.gramOfFoodType) / convertNumberBetweengramsToProductQuantity
        }
    }
    return dividePrductsToTheirFoodTypeObjectCopy;
}
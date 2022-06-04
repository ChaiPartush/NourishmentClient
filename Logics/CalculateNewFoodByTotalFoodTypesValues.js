import { valuesOfFoodByHundredGrams } from '../constants/Logics/CalculateQuantityOfEachFoodConsts'

export const AddFood = (totalgramsOfEachFoodType, productName, foodType, productaDivideToTheirFoodTypeObject, divideEachFoodTypeValueToAllProductsObject) => {
   const foodTypesValuesOfProduct = valuesOfFoodByHundredGrams.productName;

   const insertItemToProductaDivideToTheirFoodTypeObject = (productQuantity) => {
      const productObject = {
         name: productName,
         gramsFromTypeFood: totalgramsOfEachFoodType.foodType,
         quantity: productQuantity
      }
      productaDivideToTheirFoodTypeObject.foodType.push(productObject)
   }

   const insertItemToDivideEachFoodTypeValueToAllProductsObject = (productQuantity) => {
      const productObject = {
         name: productName,
         foodType: foodType,
         quantity: productQuantity
      }

      divideEachFoodTypeValueToAllProductsObject.foodType.push(productObject)

   }

   const gramsToQuantityNumberConvatorFromEachFoodTypeOfProduct = () => {
      const numberCovators = {
         carbohydrate: 0,
         fat: 0,
         protain: 0
      }

      const carbohydrateConvator = 100 / foodTypesValuesOfProduct.carbohydrate;
      const fatConvator = 100 / foodTypesValuesOfProduct.fat;
      const protainConvator = 100 / foodTypesValuesOfProduct.protain;

      numberCovators.carbohydrate = carbohydrateConvator;
      numberCovators.fat = fatConvator;
      numberCovators.protain = protainConvator;
   }

   numberOfItemInFoodType = productaDivideToTheirFoodTypeObject.foodType.length;
   if (numberOfItemInFoodType === 0) {
      const gramsToQuantityNumberConvator = 100 / foodTypesValuesOfProduct.foodType;
      const productQuantity = totalgramsOfEachFoodType.foodType / gramsToQuantityNumberConvator;
      insertItemToProductaDivideToTheirFoodTypeObject(productQuantity);
      if (divideEachFoodTypeValueToAllProductsObject.foodType.length === 0) {
         insertItemToDivideEachFoodTypeValueToAllProductsObject(productQuantity);
      }
   }
}
import {CalculateFoodTypeProduct} from './CalculateFoodTypeProduct'
import { CalculateAllFoodTypesOfProduct } from './CalculateAllFoodTypesProduct'


export const AddProfuctIndex = (dividePrductsToTheirFoodTypeObject, valuesOfAllFoodTypesInProductObject, productName, productType, totalFoodTypesValues) => {
     const mainFoodTypeUpdateObject = CalculateFoodTypeProduct(dividePrductsToTheirFoodTypeObject,productName,productType,totalFoodTypesValues)
     const calculateAllFoodTypesValuesObject= CalculateAllFoodTypesOfProduct(valuesOfAllFoodTypesInProductObject,mainFoodTypeUpdateObject, productType,productName)
}
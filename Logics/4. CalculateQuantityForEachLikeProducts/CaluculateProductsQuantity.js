import { cos, prod } from 'mathjs';
import { FoodTypes,calculatedFoodTypes } from '../../constants/Logics/FoodTypes'
import { SolveMatrix } from './SolveEquationSystem'
const SimpleSimplex = require('simple-simplex');


// Calculate the amount of each chosen product 
// We get in a parameter two things:
//   1. An object of carbohydrates,protains,fats and calories of each product 
//   2. An object of total grams of carbohydrates,protains and fats 

// If we have amount of a product and we want to know how many carbohydrates in it 
// so we will take the number of carbohydrates for 100 grams divided it by 100 and the result we
// multiply by the amount of product and we will get how many carbohydrates there is in this product 
// the same with all food types .

// so if we want to know the amount of product and we know how many carbohydrates we need from it 
// so we take  the number of carbohydrates for 100 grams divided it by 100 , multiply by X that we dont know
// and equal it to the number of carbohydrates that we want from it, and than solve eqution

// and if we have some products that we want to know the amount of each them , but we know only 
// the total carbohydrates we want from all them togther so we sum all 
// the number of carbohydrates for 100 grams divided it by 100 , multiply by 
// x1(different number after x of each product becuse the amount no defently the same) 
// and equal it to the total carbohydrates

// in this way we will do to carbohydrates, protains and fats 

// and we wil get system equition
// the way to solve system equition is with matrix 

const CheckForMainType = (carbohydrates, fats, protains) => {
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

const CheckForMinType = (carbohydrates, fats, protains) => {
    if (carbohydrates <fats) {
        if (carbohydrates < protains) {
            return FoodTypes.carbohydrates
        }
        else {
            return FoodTypes.protains
        }
    } else {
        if (fats < protains) {
            return FoodTypes.fats
        } else {
            return FoodTypes.protains
        }
    }
}

export const CalculateProductsQuantity = (productsFoodTypesValuesObject, totalgramsOfEachFoodType) => {
    let productsAndTheirQuantity = {}

    let sparatedProductsToFoodTypes = {
        carbohydrates: {},
        fats: {},
        protains: {}
    }

    let mainProductsToEachFoodType = {
        carbohydrates: [],
        fats: [],
        protains: [],
    }
    // check which food type this product and insert it to the mainProductsToEachFoodType in his foodtype
    for (product in productsFoodTypesValuesObject) {

        // get values of carbohydrates,fats and protains for 100 grams of the product 
        const productFoodTypesvaluesFor100Grams = productsFoodTypesValuesObject[product]
        // put every value of carbohydrates,fats and protains in saperated variable
    
        const carbohydratesFor100Grams = productFoodTypesvaluesFor100Grams["carbohydratesFor100Grams"]
        const fatsFor100Grams = productFoodTypesvaluesFor100Grams["fatsFor100Grams"]
        const protainsFor100Grams = productFoodTypesvaluesFor100Grams["protainsFor100Grams"]

        // check which food type value is the biggest in this product 
        const mainFoodType = CheckForMainType(carbohydratesFor100Grams, fatsFor100Grams, protainsFor100Grams)
        mainProductsToEachFoodType[mainFoodType].push(product)
    }

    for (let foodType in mainProductsToEachFoodType) {
        const foodTypeArray = mainProductsToEachFoodType[foodType]
        if (foodTypeArray.length !== 0) {
            const totalGramsOfFoodType = totalgramsOfEachFoodType[FoodTypes[foodType]]
            let sumOfValuesOfProductsInFoodTypeArray = 0
            foodTypeArray.forEach((value, index) => {
                const foodTypeProductValue = productsFoodTypesValuesObject[value][foodType + "For100Grams"]
                sumOfValuesOfProductsInFoodTypeArray += foodTypeProductValue
            })

            foodTypeArray.forEach((value, index) => {
                let amountOfFoodType =
                    (productsFoodTypesValuesObject[value][foodType + "For100Grams"] / sumOfValuesOfProductsInFoodTypeArray) *
                    totalGramsOfFoodType



                let divdeProcductFoodTypeValueBy100 = ((productsFoodTypesValuesObject[value][foodType + "For100Grams"]) / 100)


                let amountOfProduct = amountOfFoodType / divdeProcductFoodTypeValueBy100
                productsAndTheirQuantity[value] = amountOfProduct

            })
        }
    }






    for (product in productsAndTheirQuantity) {
        const productQuantity = productsAndTheirQuantity[product]
        for (let foodType in sparatedProductsToFoodTypes) {
            const foodTypeProductValueDividedBy100 = (productsFoodTypesValuesObject[product][foodType + "For100Grams"]) / 100
            const foodTypeQuantity = foodTypeProductValueDividedBy100 === 0 ? 0 : productQuantity * foodTypeProductValueDividedBy100
            sparatedProductsToFoodTypes[foodType][product] = foodTypeQuantity
        }
    }


    
    let extra = getExtraGramsFromAimTotalGramsOfEachFoodType(sparatedProductsToFoodTypes,totalgramsOfEachFoodType)
    let decreaseFromEachProduct = calculateHowManyToDecreaseFromEachProduct(extra,productsFoodTypesValuesObject,productsAndTheirQuantity)
    if(decreaseFromEachProduct["value"]===true){
        decreaseFromEachProductResult =  decreaseFromEachProduct["result"]
    for (product in decreaseFromEachProductResult){
        const countToDecrease = decreaseFromEachProductResult[product]

        for (let foodType in sparatedProductsToFoodTypes) {
            const foodTypeProductValueDividedBy100 = (productsFoodTypesValuesObject[product][foodType + "For100Grams"]) / 100
            const foodTypeQuantity = foodTypeProductValueDividedBy100 === 0 ? 0 : countToDecrease * foodTypeProductValueDividedBy100
            let currentFoodTypeQuantityFromThisProduct =  sparatedProductsToFoodTypes[foodType][product]
            sparatedProductsToFoodTypes[foodType][product] = currentFoodTypeQuantityFromThisProduct-foodTypeQuantity
        }

        let currentProductQuantity = productsAndTheirQuantity[product]
        productsAndTheirQuantity[product]=currentProductQuantity-countToDecrease 
    }

    return {result:true, value:productsAndTheirQuantity}
}else{
      return {result:false , value:decreaseFromEachProduct["result"]}
}
   


    // let foodTypesobject = {

    //     carbohydrates: {
    //         products:[],
    //         currentIndex:0,
    //         decreaseNumber:0,
    //         loopCounter:0
    //     }, 

    //     fats: {
    //         products:[],
    //         currentIndex:0,
    //         decreaseNumber:0,
    //         loopCounter:0
    //     }, 

    //     protains: {
    //         products:[],
    //         currentIndex:0,
    //         decreaseNumber:0,
    //         loopCounter:0
    //     }, 
    // }

    // const createSortedProductsArray = CreateMainProductsSortedArrays(mainProductsToEachFoodType,productsFoodTypesValuesObject,foodTypesobject)
    // Object.assign(foodTypesobject,createSortedProductsArray)

    //const getValuesOfFoodTypesOfProductsOf1Gram= ValuesOfFoodTypesByQuntityOfProduct(productsFoodTypesValuesObject,1)
    // let loopCounter =1
    //     const startTime = Date.now()
    //       while(
    //        (
    //         parseInt(Math.abs(extra[FoodTypes.carbohydrates]), 10)>0||
    //         parseInt(Math.abs(extra[FoodTypes.fats]),10)>0 ||
    //         parseInt(Math.abs(extra[FoodTypes.protains]),10)>0)){

    //            if(Date.now()-startTime>15000){
    //                break
    //            }
             
              // save in variable the food type object 
            //   const carbohydratesProductsObject=foodTypesobject[FoodTypes.carbohydrates]
            //   const protainsProductsObject=foodTypesobject[FoodTypes.protains]
            //   const fatsProductsObject=foodTypesobject[FoodTypes.fats]




            // If the extra of each foodType less than 10 we move the current product
            // to the product with lower value from this food type 
            // if(extra[FoodTypes.carbohydrates]<10){
            //     foodTypesobject[FoodTypes.carbohydrates]["currentIndex"]=foodTypesobject[FoodTypes.carbohydrates]["products"].length-1
            //   }

            //   if(extra[FoodTypes.protains]<10){
            //     foodTypesobject[FoodTypes.protains]["currentIndex"]=foodTypesobject[FoodTypes.protains]["products"].length-1
            //   }

            //   if(extra[FoodTypes.fats]<10){
            //     foodTypesobject[FoodTypes.fats]["currentIndex"]=foodTypesobject[FoodTypes.fats]["products"].length-1
            //   }

              // Get current product Index for each food type
            //   const carbohydratesCurrentIndex = carbohydratesProductsObject["currentIndex"]
            //   const protainscurrentIndex = protainsProductsObject["currentIndex"]
            //   const fatCurrentIndex = fatsProductsObject["currentIndex"]

              // Get name of product of each food type by current Index above
            //   const carbohydratesProductObjectByIndex = carbohydratesProductsObject["products"][carbohydratesCurrentIndex]["name"]
            //   const protainsProductObjectByIndex = protainsProductsObject["products"][protainscurrentIndex]["name"]
            //   const fatsProductObjectByIndex = fatsProductsObject["products"][fatCurrentIndex]["name"]

              // Order all products in array
            //   const currentProducts = [
            //       {product:carbohydratesProductObjectByIndex, foodType:FoodTypes.carbohydrates},
            //       {product:protainsProductObjectByIndex,foodType:FoodTypes.protains},
            //       {product:fatsProductObjectByIndex,foodType:FoodTypes.fats}
            //     ]

                // const totalExtra = extra[FoodTypes.carbohydrates] + extra[FoodTypes.protains] + extra[FoodTypes.fats]
                // const relativeCarbohydrates = (extra[FoodTypes.carbohydrates]/totalExtra)*10
                // const relativeFats = (extra[FoodTypes.fats]/totalExtra)*10
                // const relativeProtains = (extra[FoodTypes.protains]/totalExtra)*10
                
            

                // if(extra[FoodTypes.carbohydrates]<0){
                //     foodTypesobject[FoodTypes.carbohydrates]["decreaseNumber"]=relativeCarbohydrates
                // }

                // if(extra[FoodTypes.protains]<0){
                //     foodTypesobject[FoodTypes.protains]["decreaseNumber"]=relativeProtains
                // }

                // if(extra[FoodTypes.fats]<0){
                //     foodTypesobject[FoodTypes.fats]["decreaseNumber"]=relativeFats
                // }

                // if(parseInt(Math.abs(extra[FoodTypes.carbohydrates]), 10)===0){
                //     foodTypesobject[FoodTypes.carbohydrates]["decreaseNumber"]=0
                // }

                // if(parseInt(Math.abs(extra[FoodTypes.protains]), 10)===0){
                //     foodTypesobject[FoodTypes.protains]["decreaseNumber"]=0
                // }

                // if(parseInt(Math.abs(extra[FoodTypes.fats]), 10)===0){
                //     foodTypesobject[FoodTypes.fats]["decreaseNumber"]=0
                // }

          


        //         if(extra[FoodTypes.carbohydrates]>0){
        //             foodTypesobject[FoodTypes.carbohydrates]["decreaseNumber"]=-relativeCarbohydrates
        //         }

        //         if(extra[FoodTypes.protains]>0){
        //             foodTypesobject[FoodTypes.protains]["decreaseNumber"]=-relativeProtains
        //         }

        //         if(extra[FoodTypes.fats]>0){
        //             foodTypesobject[FoodTypes.fats]["decreaseNumber"]=-relativeFats
        //         }

        //         if((parseInt(Math.abs(extra[FoodTypes.carbohydrates]), 10)<=0) && (parseInt(Math.abs(extra[FoodTypes.fats]), 10)<=0)
        //         && (parseInt(Math.abs(extra[FoodTypes.protains]), 10)>0) ){
        //             foodTypesobject[FoodTypes.protains]["decreaseNumber"]=foodTypesobject[FoodTypes.protains]["decreaseNumber"]*2
        //         }

        //         if((parseInt(Math.abs(extra[FoodTypes.carbohydrates]), 10)<=0) && (parseInt(Math.abs(extra[FoodTypes.protains]), 10)<=0)
        //         && (parseInt(Math.abs(extra[FoodTypes.fats]), 10)>0) ){
        //             foodTypesobject[FoodTypes.fats]["decreaseNumber"]=foodTypesobject[FoodTypes.fats]["decreaseNumber"]*2
        //         }

        //         if((parseInt(Math.abs(extra[FoodTypes.fats]), 10)<=0) && (parseInt(Math.abs(extra[FoodTypes.protains]), 10)<=0)
        //         && (parseInt(Math.abs(extra[FoodTypes.carbohydrates]), 10)>0) ){
        //             foodTypesobject[FoodTypes.carbohydrates]["decreaseNumber"]= foodTypesobject[FoodTypes.carbohydrates]["decreaseNumber"]*2
        //         }

        //       currentProducts.forEach((productobj,indexProduct)=>{
        //           const foodType = productobj["foodType"]
        //           const product = productobj["product"]

        //           const currentQuantity = productsAndTheirQuantity[product]
        //           let newQuantity = currentQuantity+foodTypesobject[foodType]["decreaseNumber"]
        //           if(newQuantity>0){
        //           productsAndTheirQuantity[product]=newQuantity

        //         for (let foodType in sparatedProductsToFoodTypes) {
        //             const amountOfFoodTypeOfProductFor100GramsDividedBy100 = productsFoodTypesValuesObject[product][foodType + "For100Grams"] / 100
        //             sparatedProductsToFoodTypes[foodType][product] = newQuantity * amountOfFoodTypeOfProductFor100GramsDividedBy100
        //            }
        //          }
        //         })

                
        //       foodTypesobject[FoodTypes.carbohydrates]["loopCounter"]=foodTypesobject[FoodTypes.carbohydrates]["loopCounter"]+1
        //       foodTypesobject[FoodTypes.protains]["loopCounter"]=foodTypesobject[FoodTypes.protains]["loopCounter"]+1
        //       foodTypesobject[FoodTypes.fats]["loopCounter"]=foodTypesobject[FoodTypes.fats]["loopCounter"]+ 1

        //       const carbohydratesExtra = extra[FoodTypes.carbohydrates]
        //       const fatsExtra = extra[FoodTypes.fats]
        //       const protainsExtra = extra[FoodTypes.protains]
                
        //         extra =getExtraGramsFromAimTotalGramsOfEachFoodType(sparatedProductsToFoodTypes,totalgramsOfEachFoodType)
        //         loopCounter=loopCounter+1
                
        //         if( 
        //             ((parseInt(Math.abs(carbohydratesExtra), 10)) === (parseInt(Math.abs(extra[FoodTypes.carbohydrates]), 10))) &&
        //             (foodTypesobject[FoodTypes.carbohydrates]["loopCounter"]>10)){
        //                 const currentIndex = foodTypesobject[FoodTypes.carbohydrates]["currentIndex"]
        //                 if(currentIndex+1 < foodTypesobject[FoodTypes.carbohydrates]["products"].length){
        //                     foodTypesobject[FoodTypes.carbohydrates]["currentIndex"]=foodTypesobject[FoodTypes.carbohydrates]["currentIndex"]+1
        //                 }else {
        //                     if(currentIndex=== foodTypesobject[FoodTypes.carbohydrates]["products"].length-1){
        //                         foodTypesobject[FoodTypes.carbohydrates]["decreaseNumber"]=foodTypesobject[FoodTypes.carbohydrates]["decreaseNumber"]*0.1
        //                     }else{
        //                     foodTypesobject[FoodTypes.carbohydrates]["decreaseNumber"]=foodTypesobject[FoodTypes.carbohydrates]["decreaseNumber"]*2
        //                     }
        //                 }
        //                 foodTypesobject[FoodTypes.carbohydrates]["loopCounter"]=0
                    
        //         }

        //         if( 
        //             ((parseInt(Math.abs(fatsExtra), 10)) === (parseInt(Math.abs(extra[FoodTypes.fats]), 10))) &&
        //             (foodTypesobject[FoodTypes.fats]["loopCounter"]>10)){
        //                 const currentIndex = foodTypesobject[FoodTypes.fats]["currentIndex"]
        //                 if(currentIndex+1 < foodTypesobject[FoodTypes.fats]["products"].length){
        //                     foodTypesobject[FoodTypes.fats]["currentIndex"]=foodTypesobject[FoodTypes.fats]["currentIndex"]+1
        //                 }else {
        //                     if(currentIndex=== foodTypesobject[FoodTypes.fats]["products"].length-1){
        //                         foodTypesobject[FoodTypes.fats]["decreaseNumber"]=foodTypesobject[FoodTypes.fats]["decreaseNumber"]*0.1
        //                     }else{
        //                     foodTypesobject[FoodTypes.fats]["decreaseNumber"]=foodTypesobject[FoodTypes.fats]["decreaseNumber"]*2
        //                     }
        //                 }
        //                 foodTypesobject[FoodTypes.fats]["loopCounter"]=0
                    
        //         }

        //         if( 
        //             ((parseInt(Math.abs(protainsExtra), 10)) === (parseInt(Math.abs(extra[FoodTypes.protains]), 10))) &&
        //             (foodTypesobject[FoodTypes.protains]["loopCounter"]>10)){
        //                 const currentIndex = foodTypesobject[FoodTypes.protains]["currentIndex"]
        //                 if(currentIndex+1 < foodTypesobject[FoodTypes.protains]["products"].length){
        //                     foodTypesobject[FoodTypes.protains]["currentIndex"]=foodTypesobject[FoodTypes.protains]["currentIndex"]+1
        //                 }else {
        //                     if(currentIndex=== foodTypesobject[FoodTypes.protains]["products"].length-1){
        //                         foodTypesobject[FoodTypes.protains]["decreaseNumber"]=foodTypesobject[FoodTypes.protains]["decreaseNumber"]*0.1
        //                     }else{
        //                     foodTypesobject[FoodTypes.protains]["decreaseNumber"]=foodTypesobject[FoodTypes.protains]["decreaseNumber"]
        //                     }
        //                 }

        //                 foodTypesobject[FoodTypes.protains]["loopCounter"]=0
                    
        //         }





        // }
        //   console.log(extra)
        //     if( parseInt(Math.abs(extra[FoodTypes.carbohydrates]), 10)===0 &&
        //     parseInt(Math.abs(extra[FoodTypes.fats]),10)===0 &&
        //     parseInt(Math.abs(extra[FoodTypes.protains]),10)===0){
             
        //      return productsAndTheirQuantity
        //     }else {
        //         return false
        //     }
}

const calculateHowManyToDecreaseFromEachProduct = (extra,productsFoodTypesValuesObject,productsAndTheirQuantity)=>{
  let productGrmas = {base:10, power:0, value:1}
  let extraObject = {
      carbohydrates: extra[FoodTypes.carbohydrates],
      protains:extra[FoodTypes.protains],
      fats:extra[FoodTypes.fats]
  }

  let productsAndQuntityToDecrease = {}

  for(let product in productsAndTheirQuantity){
    productsAndQuntityToDecrease[product]=0
  }

 let stuckIndex = {value:0}
  const startTime = Date.now()

  while(parseInt(Math.abs(extraObject[FoodTypes.carbohydrates]), 10)>0  || 
        parseInt(Math.abs(extraObject[FoodTypes.fats]), 10)>0 ||
        parseInt(Math.abs(extraObject[FoodTypes.protains]), 10)>0)
{
       
        if(Date.now()-startTime>10000){
            return {
                value: false,
                result: extraObject
            }
      
        }


        let productsValues = ValuesOfFoodTypesByQuntityOfProduct(productsFoodTypesValuesObject,productGrmas["value"])
        let maxExtraFoodType = CheckForMainType(extraObject[FoodTypes.carbohydrates],extraObject[FoodTypes.fats],extraObject[FoodTypes.protains])
        let minExtraFoodType = CheckForMinType(extraObject[FoodTypes.carbohydrates],extraObject[FoodTypes.fats],extraObject[FoodTypes.protains])
        
        calculatedFoodTypes.forEach((value,index)=>{
            if(value!==maxExtraFoodType && value!==minExtraFoodType){
                middleFoodType=value
            }
        })
        

        const extraCarbohydrates = parseInt(Math.abs(extraObject[FoodTypes.carbohydrates]), 10)
        const extraFats = parseInt(Math.abs(extraObject[FoodTypes.fats]), 10)
        const extraProtains = parseInt(Math.abs(extraObject[FoodTypes.protains]), 10)
        for(product in productsValues){
            const productObject = productsValues[product]
            const carbohydrates = productObject[FoodTypes.carbohydrates]
            const fats = productObject[FoodTypes.fats]
            const protains = productObject[FoodTypes.protains]

            const checkForMaxFoodType = CheckForMainType(carbohydrates,fats,protains)
            const checkForMinType = CheckForMinType(carbohydrates,fats,protains)
            calculatedFoodTypes.forEach((value,index)=>{
                if(value!==checkForMaxFoodType && value!==checkForMinType){
                    checkForMiddleType=value
                }
            })

      
            if (extraObject[FoodTypes.carbohydrates]-carbohydrates>=-1  && extraObject[FoodTypes.fats]-fats>=-1 && extraObject[FoodTypes.protains]-protains>=-1)
            {
                 if(checkForMaxFoodType===maxExtraFoodType || checkForMinType===minExtraFoodType )
                 {

                   // check if we cnn decrease the value In productGrams variable 
                    if(productsAndTheirQuantity[product]-productGrmas["value"]>0)
                      {
                         // update rhe extra object with values of product with the quantity we decrease 
                         extraObject[FoodTypes.carbohydrates]= extraObject[FoodTypes.carbohydrates]-carbohydrates
                         extraObject[FoodTypes.fats]= extraObject[FoodTypes.fats]-fats
                         extraObject[FoodTypes.protains]= extraObject[FoodTypes.protains]-protains
                    
                         // and the amount we decrease to the result object 
                         productsAndQuntityToDecrease[product]= (productsAndQuntityToDecrease[product]+productGrmas["value"])

                         
                    }
                }
            }



        }
    const carbohydrateNum = parseInt(Math.abs(extraObject[FoodTypes.carbohydrates]), 10)
    const fatsNum = parseInt(Math.abs(extraObject[FoodTypes.fats]), 10)
    const protainsNum = parseInt(Math.abs(extraObject[FoodTypes.protains]), 10)
    
        if(carbohydrateNum===extraCarbohydrates || fatsNum===extraFats || protainsNum===extraProtains){
            if(stuckIndex<5){
                stuckIndex["value"]=stuckIndex["value"]+1
            }else{
                stuckIndex["value"]=0
                if((productGrmas["value"]-(Math.pow(productGrmas["base"],productGrmas["power"]))===0)){
                    productGrmas["power"]=productGrmas["power"]-1
                    
               }
               productGrmas["value"]=Math.abs((productGrmas["value"]-(Math.pow(productGrmas["base"],productGrmas["power"]))))
            }
        }
  }

  return {
    value: true,
    result: productsAndQuntityToDecrease
  }
  
  
  
}

const HowManyGramsDeacreseFromProductThatThwExtranStayPositive=(extra,productQuantity,productFoodTypesFor1GramOfProduct)=>{
    carbohydratesRange = extra[FoodTypes.carbohydrates]/productFoodTypesFor1GramOfProduct[FoodTypes.carbohydrates]
    fatsRange = extra[FoodTypes.fats]/productFoodTypesFor1GramOfProduct[FoodTypes.fats]
    protainssRange = extra[FoodTypes.protains]/productFoodTypesFor1GramOfProduct[FoodTypes.protains]

    let minRange = Math.min(carbohydratesRange,fatsRange,protainssRange)

    while(productQuantity-minRange<0){
        minRange-=1
    }

    return minRange*0.5

}

const ValuesOfFoodTypesByQuntityOfProduct=(productsValues,productQuantity)=>{
   const valueOfEachFoodTypeByProductQuantity={}
   for(product in productsValues){
       const productValuesObject = productsValues[product]
      const carbohydrates = [(productValuesObject["carbohydratesFor100Grams"])/100] * productQuantity
      const fats = [(productValuesObject["fatsFor100Grams"])/100] * productQuantity
      const protains = [(productValuesObject["protainsFor100Grams"])/100] * productQuantity
      valueOfEachFoodTypeByProductQuantity[product]={
        carbohydrates:carbohydrates,
        fats:fats,
        protains:protains
      }
   }

   return valueOfEachFoodTypeByProductQuantity
}


const CreateMainProductsSortedArrays = (mainProductsToEachFoodType,productsFoodTypesValuesObject,foodTypesobject) => {
    for(let foodType in  mainProductsToEachFoodType){
        const foodTypeArray = mainProductsToEachFoodType[foodType]
        foodTypeArray.forEach((product,productIndex)=>{
            const mainFoodTypeValue = productsFoodTypesValuesObject[product][foodType + "For100Grams"]
            foodTypesobject[foodType]["products"].push ({name:product, value:mainFoodTypeValue})
        })
        foodTypesobject[foodType]["products"].sort((a, b) => (a.value < b.value) ? 1 : -1)
    }

    return foodTypesobject
} 





const getExtraGramsFromAimTotalGramsOfEachFoodType = (sparatedProductsToFoodTypes,totalgramsOfEachFoodType)=>{
    let extra = {
        carbohydrates: 0,
        fats: 0,
        protains: 0
    }
    for (let foodType in sparatedProductsToFoodTypes) {
        const foodTypeObject = sparatedProductsToFoodTypes[foodType]
        let sum = 0
        for (let itemInFoodType in foodTypeObject) {
            const productQuantityFoodType = foodTypeObject[itemInFoodType]
            sum += productQuantityFoodType
        }

        const calculateExtra = sum - totalgramsOfEachFoodType[foodType]
        extra[foodType] = calculateExtra
    }

    return extra

    
}

const whichProductFromProductsListTheValuesOfListOfFoodTypesIsLower = (products,foodTypes,productsFoodTypesValuesObject)=>{
    let results = {}
    foodTypes.forEach((foodType,index)=>{
        results[foodType]={}
         products.forEach((product,index)=>{
            const foodTypeValue = productsFoodTypesValuesObject[product][foodType + "For100Grams"]
            results[foodType][product]=foodTypeValue
         })
     })

     const product ={}
     products.forEach((value,index)=>{
        product[value]=0
     })

     for( let foodType in results){
        const foodTypeObj = results[foodType]
        for(let item in foodTypeObj){
            product[item]+=foodTypeObj[item]
        }
     }
     
     let min ={name:'', value:0}
     for(let item in product){
       const value = product[item]
       if(min["name"]===''){
           min["name"]=item
           min["value"]=value
       }else if(min["value"]>value){
           min["name"]=item
           min["value"]=value
       }
     }

     return min["name"]

   
}




// const CreateMatrix = (
//     productsValuesObject,
//     totalCarbohydrates,
//     totalFats,
//     totalProtains) => {

//     let carbohydrates = [], fats = [], protains = []
//     for (let product in productsValuesObject) {
//         const productValues = productsValuesObject[product]
//         const carbohydratesValueDivideBy100 = productValues["carbohydrateFor100Grams"] / 100
//         const fatsValueDivideBy100 = productValues["fatFor100Grams"] / 100
//         const protainsValueDivideBy100 = productValues["protainFor100Grams"] / 100
//         carbohydrates.push(carbohydratesValueDivideBy100)
//         fats.push(fatsValueDivideBy100)
//         protains.push(protainsValueDivideBy100)
//     }

//     carbohydrates.push(totalCarbohydrates)
//     fats.push(totalFats)
//     protains.push(totalProtains)
//     const equationSystem = [carbohydrates, fats, protains]
//     return equationSystem
// }
//  // const objective = CreateObjective(productsFoodTypesValuesObject)
//     // const constraints = CreateConstraints(productsFoodTypesValuesObject, totalgramsOfEachFoodType)
//     // const solveEquationSystem = solveMatrixWithConditions(objective, constraints)
//     // console.log(solveEquationSystem)
//     // first we have to create the matrix
//     // we pass :
//     //     1. the values of carbohydrates,protains,fats and calories of each chosen food
//     //     2. total amount of carbohydrates
//     //     3. tottal amount of fats
//     //     4. total amount of protains
//     // const matrix = CreateMatrix(
//     //     productsFoodTypesValuesObject,
//     //     totalgramsOfEachFoodType[FoodTypes.carbohydrates],
//     //     totalgramsOfEachFoodType[FoodTypes.fats],
//     //     totalgramsOfEachFoodType[FoodTypes.protains]
//     // )



//     // now we want to solve this matrix
//     // const solveMatrix = SolveMatrix(matrix)
//     // console.log(solveMatrix)


//     // because we want to know the quantity of each product, quantity can't be negative number
//     // so we need to check when depended varibles equal to zero 

//     // const equalAlldependedToZeroAndPutNumbersInLeftAndVariablesInRight =
//     //     EqualAlldependedToZeroAndPutNumbersInLeftAndVariablesInRight(solveMatrix["dependet"])

//     // const objective = CreateObjective(equalAlldependedToZeroAndPutNumbersInLeftAndVariablesInRight)
//     // const constraints = CreateConstraints(equalAlldependedToZeroAndPutNumbersInLeftAndVariablesInRight)
//     // const solveEquationSystem = solveMatrixWithConditions(objective, constraints)
//     // console.log(solveEquationSystem)
//     // const createMatrixOfTheEquationWeOrederAbove =
//     //     CreateMatrixOfTheEquationWeOrederAbove(equalAlldependedToZeroAndPutNumbersInLeftAndVariablesInRight)

//     // const solveMatrixWeCreatedAbove = SolveMatrix(createMatrixOfTheEquationWeOrederAbove)
//     // console.log(solveMatrixWeCreatedAbove)
// const EqualAlldependedToZeroAndPutNumbersInLeftAndVariablesInRight = (dependedEquationsArray) => {

//     //make a copy of dependedEquationsArray
//     const dependedEquationsArrayCopy = [...dependedEquationsArray]

//     // loop on depended variable expressions
//     dependedEquationsArray.forEach((value, equationNumber) => {

//         //* eaual all variable expressions to 200 *
//         dependedEquationsArrayCopy[equationNumber]["leftPartOfEquation"][0]["number"] = 0


//         // * move numbers without variable to left side *
//         const rightSideOfEquation = value["rightPartOfEquation"]
//         // loop all items in right side of equation
//         rightSideOfEquation.forEach((value, rightSideElementIndex) => {
//             const variable = value["variable"]
//             // if there isn't a variable to the item
//             if (variable === "without") {

//                 // multiply it by -1
//                 dependedEquationsArrayCopy[equationNumber]["rightPartOfEquation"][rightSideElementIndex]["number"] *= -1

//                 // and add it to left side
//                 dependedEquationsArrayCopy[equationNumber]["leftPartOfEquation"][0]["number"] +=
//                     dependedEquationsArrayCopy[equationNumber]["rightPartOfEquation"][rightSideElementIndex]["number"]

//                 //delete it from the right side 
//                 dependedEquationsArrayCopy[equationNumber]["rightPartOfEquation"].splice(rightSideElementIndex, 1)
//             }
//         })
//     })

//     return dependedEquationsArrayCopy


// }
// const CreateMatrixOfTheEquationWeOrederAbove = (equationsArray) => {
//     let matrix = []

//     // loop on  each equation in array
//     equationsArray.forEach((value, index) => {
//         // create row in matrix
//         let rowInMatrix = []

//         // get right side of equation
//         let rightSideOfEquation = value["rightPartOfEquation"]

//         // loop on elements on right side of equation
//         rightSideOfEquation.forEach((value, index) => {

//             // get the number of element
//             const numberOfEalemnt = value["number"]

//             // insert it to row in matrix that we created
//             rowInMatrix.push(numberOfEalemnt)
//         })

//         // when we fill all the row with number of variables we will add the result of all the equation equal to 
//         // so we get the left side 
//         let leftSideOfEquation = value["leftPartOfEquation"]

//         // and put it in the last item in row we created
//         rowInMatrix.push(leftSideOfEquation[0]["number"])

//         // and finally put all the finish row in the matrix
//         matrix.push(rowInMatrix)
//     })

//     return matrix
// }
// const CreateObjective = (equationArray) => {
//     const objective = {}
//     const firstItem = equationArray[0]["rightPartOfEquation"]
//     firstItem.forEach((value, index) => {
//         const variable = value["variable"]
//         objective[variable] = 1
//     })
//     return objective
// }
// const CreateConstraints = (equationsArray) => {

//     let constraints = []
//     equationsArray.forEach((equation, index) => {
//         let constraintObj = { namedVector: {}, constraint: '', constant: 0 }
//         const leftSideOfEquation = equation["rightPartOfEquation"]
//         leftSideOfEquation.forEach((element, index) => {
//             variableName = element["variable"]
//             numberValue = element["number"]
//             constraintObj["namedVector"][variableName] = numberValue
//         })
//         constraintObj["constraint"] = '>='
//         constraintObj["constant"] = equation["leftPartOfEquation"][0]["number"]
//         constraints.push(constraintObj)
//     })

//     const rightSideFirstItem = equationsArray[0]["rightPartOfEquation"]

//     rightSideFirstItem.forEach((mainValue, index) => {
//         let obj = { namedVector: {}, constraint: '', constant: 0 }
//         const mainValueVariable = mainValue["variable"]
//         rightSideFirstItem.forEach((secondValue, index) => {
//             const secondValueVariable = secondValue["variable"]
//             if (mainValueVariable === secondValueVariable) {
//                 obj["namedVector"][mainValueVariable] = 1
//                 obj["constraint"] = '>='
//                 obj["constant"] = 10
//             }
//             else {
//                 obj["namedVector"][secondValueVariable] = 0
//             }
//         })
//         constraints.push(obj)
//     })

//     return constraints

// }
// // const CreateObjective = (variblesObject) => {
// //     // let objective = {}
// //     // for (let product in variblesObject) {
// //     //     objective[product] = 1
// //     // }

// //     // return objective

// //     const objective = {
// //         "almond": 1,
// //         "avocado": 1,
// //         "beef": 1,
// //         "breast": 1,
// //         "qinoa": 1,
// //         "rice": 1,
// //         "tomatto": 1,
// //     }
// //     return objective
// // }
// // const CreateConstraints = (productsValuesObject, totalgramsOfEachFoodType) => {

// //     let constraints = []

// //     let carbohydrates = {}
// //     let fats = {}
// //     let protains = {}

// //     for (let product in productsValuesObject) {
// //         const productValues = productsValuesObject[product]
// //         const carbohydratesValueDivideBy100 = productValues["carbohydrateFor100Grams"] / 100
// //         const fatsValueDivideBy100 = productValues["fatFor100Grams"] / 100
// //         const protainsValueDivideBy100 = productValues["protainFor100Grams"] / 100

// //         carbohydrates[product] = carbohydratesValueDivideBy100
// //         fats[product] = fatsValueDivideBy100
// //         protains[product] = protainsValueDivideBy100

// //     }

// //     constraints.push(CreateConstraintObject(carbohydrates, '>=', totalgramsOfEachFoodType[FoodTypes.carbohydrates] - 0.1))
// //     constraints.push(CreateConstraintObject(carbohydrates, '<=', totalgramsOfEachFoodType[FoodTypes.carbohydrates] + 0.1))

// //     constraints.push(CreateConstraintObject(fats, '>=', totalgramsOfEachFoodType[FoodTypes.fats] - 0.1))
// //     constraints.push(CreateConstraintObject(fats, '<=', totalgramsOfEachFoodType[FoodTypes.fats] + 0.1))

// //     constraints.push(CreateConstraintObject(protains, '>=', totalgramsOfEachFoodType[FoodTypes.protains] - 0.1))
// //     constraints.push(CreateConstraintObject(protains, '<=', totalgramsOfEachFoodType[FoodTypes.protains] + 0.1))

// //     for (let mainProduct in productsValuesObject) {
// //         let obj = { namedVector: {}, constraint: '', constant: 0 }
// //         for (let otherProduct in productsValuesObject) {
// //             if (mainProduct === otherProduct) {
// //                 obj["namedVector"][mainProduct] = 1
// //                 obj["constraint"] = '>='
// //                 obj["constant"] = 3
// //             }
// //             else {
// //                 obj["namedVector"][otherProduct] = 0
// //             }


// //         }
// //         constraints.push(obj)
// //     }
// //     return constraints
// // }

// const CreateConstraintObject = (namedVector, constraint, constant) => {
//     const obj = {
//         namedVector: namedVector, constraint: constraint, constant: constant
//     }

//     return obj
// }

// const solveMatrixWithConditions = (currentObjective, currentConstraints) => {
//     // initialize a solver
//     const solver = new SimpleSimplex({
//         objective: currentObjective,
//         constraints: currentConstraints,
//         optimizationType: 'max',
//     });


//     // call the solve method with a method name
//     const result = solver.solve({
//         methodName: 'simplex',
//     });

//     return result.solution["coefficients"]


// }
   // if there is no main product in this food type insert it 
        // if (Object.keys(sparatedProductsToFoodTypes[mainFoodType]).length === 0) {

        //     // calculate product quantity by total value of the main food type 
        //     const productQuantity = totalCarbohydrates / (carbohydratesFor100Grams / 100)

        //     // insert the product quantity to products quantity list 
        //     productsAndTheirQuantity[product] = productQuantity

        //     // update amount of each food type by quantity of food type
        //     sparatedProductsToFoodTypes[FoodTypes.carbohydrates][product] =
        //         productQuantity * (carbohydratesFor100Grams / 100)

        //     sparatedProductsToFoodTypes[FoodTypes.fats][product] =
        //         productQuantity * (fatsFor100Grams / 100)

        //     sparatedProductsToFoodTypes[FoodTypes.protains][product] =
        //         productQuantity * (protainsFor100Grams / 100)

        //     // insert the product to main food type list 
        //     mainProductsToEachFoodType[mainFoodType].push(product)

        // }


//     let finishFoodType = []

//      while(finishFoodType.length<3){
      
  
        
//     const sparatedProductsOfFoodTypeAbove = sparatedProductsToFoodTypes[topFoodTypeExtraValue]
//     const mainProductsOfFoodTypeAbove = mainProductsToEachFoodType[topFoodTypeExtraValue]
//     const extraValueOfFoodTypeAbove = extra[topFoodTypeExtraValue]

//     if(finishFoodType.length===0){

//     let sumProductsValues = 0
//     mainProductsOfFoodTypeAbove.forEach((value, index) => {
//         const foodTypeGrams = sparatedProductsOfFoodTypeAbove[value]
//         sumProductsValues += foodTypeGrams
//     })

//     mainProductsOfFoodTypeAbove.forEach((value, index) => {
//         const currentGramsOfFoodTypeOfProduct = sparatedProductsOfFoodTypeAbove[value]
//         const relativeFromTotalCurrentMainProducts = currentGramsOfFoodTypeOfProduct / sumProductsValues
//        let newGramsOfProduct=0


//         if(extraValueOfFoodTypeAbove>0){
//              newGramsOfProduct = currentGramsOfFoodTypeOfProduct - (extraValueOfFoodTypeAbove * relativeFromTotalCurrentMainProducts)
//         }

//         if(extraValueOfFoodTypeAbove<=0){
//             newGramsOfProduct = currentGramsOfFoodTypeOfProduct + (extraValueOfFoodTypeAbove * relativeFromTotalCurrentMainProducts)
//         }
       

//         const amountOfFoodTypeFor100GramsOfProduct = productsFoodTypesValuesObject[value][topFoodTypeExtraValue + "For100Grams"]
//         const newProductQuantity = newGramsOfProduct / (amountOfFoodTypeFor100GramsOfProduct / 100)
//         productsAndTheirQuantity[value] = newProductQuantity

//         for (let foodType in sparatedProductsToFoodTypes) {
//             const amountOfFoodTypeOfProductFor100GramsDividedBy100 = productsFoodTypesValuesObject[value][foodType + "For100Grams"] / 100
//             sparatedProductsToFoodTypes[foodType][value] = newProductQuantity * amountOfFoodTypeOfProductFor100GramsDividedBy100
//         }


//     })
// }

//    else{
//     const product = whichProductFromProductsListTheValuesOfListOfFoodTypesIsLower(mainProductsOfFoodTypeAbove,finishFoodType,productsFoodTypesValuesObject)
//     const currentGramsOfFoodTypeOfProduct = sparatedProductsOfFoodTypeAbove[product]
//    let newGramsOfProduct=0
//     if(extraValueOfFoodTypeAbove>0 ){
//          newGramsOfProduct = currentGramsOfFoodTypeOfProduct - extraValueOfFoodTypeAbove 
//           if(newGramsOfProduct<0){
//              const distance =Math.abs(currentGramsOfFoodTypeOfProduct - extraValueOfFoodTypeAbove)
//              const newExtra= extraValueOfFoodTypeAbove-distance-5
//              console.log(currentGramsOfFoodTypeOfProduct)
//         //     newGramsOfProduct= currentGramsOfFoodTypeOfProduct-newExtra
//          }
//     }

//     if(extraValueOfFoodTypeAbove<=0){
//         newGramsOfProduct = currentGramsOfFoodTypeOfProduct + extraValueOfFoodTypeAbove 
//     }

//     const amountOfFoodTypeFor100GramsOfProduct = productsFoodTypesValuesObject[product][topFoodTypeExtraValue + "For100Grams"]
//     const newProductQuantity = newGramsOfProduct / (amountOfFoodTypeFor100GramsOfProduct / 100)
//     productsAndTheirQuantity[product] = newProductQuantity

//     for (let foodType in sparatedProductsToFoodTypes) {
//         const amountOfFoodTypeOfProductFor100GramsDividedBy100 = productsFoodTypesValuesObject[product][foodType + "For100Grams"] / 100
//         sparatedProductsToFoodTypes[foodType][product] = newProductQuantity * amountOfFoodTypeOfProductFor100GramsDividedBy100
//     }
    
   

//    }
 

    

//     extra = getExtraGramsFromAimTotalGramsOfEachFoodType(sparatedProductsToFoodTypes,totalgramsOfEachFoodType) 
//     for(let foodType in extra){
//        const value = extra[foodType]
//        if(value>-0.1 && value<0.1){
//          finishFoodType.push(foodType)
//        }
//     }
//     topFoodTypeExtraValue = CheckForMainType(extra[FoodTypes.carbohydrates], extra[FoodTypes.fats], extra[FoodTypes.protains])

// } 

// console.log(extra, productsAndTheirQuantity)
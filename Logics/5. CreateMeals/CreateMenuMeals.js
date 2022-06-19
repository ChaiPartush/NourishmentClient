import { FoodTypes } from "../../constants/Logics/FoodTypes"

export const CreateMenuMealsByNumberOfMeals = (productsAndThierQuantity, numberOfMealAndPrecentOfCaloriesInEachMeal, productsProperties) => {

    //Divede Products to food Types and Calculate total calories to each food type and each product by his quantity
    const productsOrderedToFoodTypesWithTotalCaloriesToEachFoodTypeAndEachProduct = DivideProductsToFoodTypes(productsAndThierQuantity, productsProperties)

    // divide products and their quantity to meals
    let meals = SparatedProductsAndTheirQuantityToMeals(
        productsOrderedToFoodTypesWithTotalCaloriesToEachFoodTypeAndEachProduct,
        numberOfMealAndPrecentOfCaloriesInEachMeal,
    )

    

    for (let meal in meals) {
        let mealProduct = meals[meal]
        for (let product in mealProduct) {
            let procductAmount = mealProduct[product]
            let roundedProductAmount = Math.round(procductAmount)
            meals[meal][product] = roundedProductAmount
        }
    }

    return meals






}

const DivideProductsToFoodTypes = (productsAndTheirQuantity, productsProperties) => {

    const foodTypesArraysObject = {
        carbohydrates: { products: [], calories: 0 },
        fats: { products: [], calories: 0 },
        protains: { products: [], calories: 0 },
        vitamins: { products: [], calories: 0 },
    }

    // loop on products 
    for (product in productsAndTheirQuantity) {
        // get food type of product 
        const type = productsProperties[product]["type"]

        // get quantity of the product 
        const quantity = Math.round(productsAndTheirQuantity[product])

        //      get calories of product for 100 grams and divide it by 100 
        const productCaloriesFor100GramsdividedBy100 = productsProperties[product]["caloriesFor100Grams"] / 100

        const productCaloriesForThisQuantity = quantity * productCaloriesFor100GramsdividedBy100

        //     // insert name of product to his food type array 
        foodTypesArraysObject[type]["products"].push({ name: product, quantity: quantity, caloriesFor100GramsDividedBy100: productCaloriesFor100GramsdividedBy100, calories: productCaloriesForThisQuantity })

        //     // get current total calories of food type 
        const currentFoodTypeCalories = foodTypesArraysObject[type]["calories"]

        //     // add the product caalories to total calories of food type 
        foodTypesArraysObject[type]["calories"] = currentFoodTypeCalories + productCaloriesForThisQuantity
    }


    return foodTypesArraysObject

}

const SparatedProductsAndTheirQuantityToMeals = (
    productsOrderedToFoodTypesWithTotalCaloriesToEachFoodTypeAndEachProduct,
    objectOfNumberOfMealsAndPrecentOfCaloriesToEachMealFromTotalCalories,
) => {



    let meals = {}

    let manageCaloriesFoodTypesAndCaloriesProducts = Object.assign({}, productsOrderedToFoodTypesWithTotalCaloriesToEachFoodTypeAndEachProduct)

    for (let meal in objectOfNumberOfMealsAndPrecentOfCaloriesToEachMealFromTotalCalories) {
        meals[meal] = {}
        const precentDivideBy100 = objectOfNumberOfMealsAndPrecentOfCaloriesToEachMealFromTotalCalories[meal] / 100
        for (let foodType in productsOrderedToFoodTypesWithTotalCaloriesToEachFoodTypeAndEachProduct) {
            const foodTypeObj = productsOrderedToFoodTypesWithTotalCaloriesToEachFoodTypeAndEachProduct[foodType]
            const caloriesOfFoodType = foodTypeObj["calories"]
            const caloriesByPrecent = caloriesOfFoodType * precentDivideBy100

            const products = foodTypeObj["products"]

            for (let index = 0; caloriesByPrecent > 0 && index < products.length; index++) {
                const product = products[index]
                const productName = product["name"]
                const productCalories = product["calories"]

                const caloriesToTake = caloriesByPrecent >= productCalories ? productCalories : caloriesByPrecent
                if (caloriesToTake !== 0) {

                    const productQuantity = caloriesToTake / product["caloriesFor100GramsDividedBy100"]

                    meals[meal][productName] = productQuantity

                    caloriesByPrecent = caloriesByPrecent - caloriesToTake

                    manageCaloriesFoodTypesAndCaloriesProducts[foodType]["products"][index]["calories"] = productCalories - caloriesToTake
                }
            }
        }
    }

    return meals

}




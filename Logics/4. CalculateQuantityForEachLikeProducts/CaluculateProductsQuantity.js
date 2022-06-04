import { FoodTypes } from '../../constants/Logics/FoodTypes'
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

export const CalculateProductsQuantity = (productsFoodTypesValuesObject, totalgramsOfEachFoodType) => {
    // initialize a solver
    const solver = new SimpleSimplex({
        objective: {
            a: 70,
            b: 210,
            c: 140,
        },
        constraints: [
            {
                namedVector: { a: 1, b: 1, c: 1 },
                constraint: '<=',
                constant: 100,
            },
            {
                namedVector: { a: 5, b: 4, c: 4 },
                constraint: '<=',
                constant: 480,
            },
            {
                namedVector: { a: 40, b: 20, c: 30 },
                constraint: '<=',
                constant: 3200,
            },
        ],
        optimizationType: 'max',
    });

    // call the solve method with a method name
    const result = solver.solve({
        methodName: 'simplex',
    });

    // see the solution and meta data
    console.log({
        solution: result.solution,
        isOptimal: result.details.isOptimal,
    });



    // first we have to create the matrix
    // we pass :
    //     1. the values of carbohydrates,protains,fats and calories of each chosen food
    //     2. total amount of carbohydrates
    //     3. tottal amount of fats
    //     4. total amount of protains
    // const matrix = CreateMatrix(
    //     productsFoodTypesValuesObject,
    //     totalgramsOfEachFoodType[FoodTypes.carbohydrates],
    //     totalgramsOfEachFoodType[FoodTypes.fats],
    //     totalgramsOfEachFoodType[FoodTypes.protains]
    // )



    // now we want to solve this matrix
    // const solveMatrix = SolveMatrix(matrix)
    // console.log(solveMatrix)


    // because we want to know the quantity of each product, quantity can't be negative number
    // so we need to check when depended varibles equal to zero 

    // const equalAlldependedToZeroAndPutNumbersInLeftAndVariablesInRight =
    //     EqualAlldependedToZeroAndPutNumbersInLeftAndVariablesInRight(solveMatrix["dependet"])

    // const createMatrixOfTheEquationWeOrederAbove =
    //     CreateMatrixOfTheEquationWeOrederAbove(equalAlldependedToZeroAndPutNumbersInLeftAndVariablesInRight)

    // const solveMatrixWeCreatedAbove = SolveMatrix(createMatrixOfTheEquationWeOrederAbove)
    // console.log(solveMatrixWeCreatedAbove)
}

const CreateMatrix = (
    productsValuesObject,
    totalCarbohydrates,
    totalFats,
    totalProtains) => {

    let carbohydrates = [], fats = [], protains = []
    for (let product in productsValuesObject) {
        const productValues = productsValuesObject[product]
        const carbohydratesValueDivideBy100 = productValues["carbohydrateFor100Grams"] / 100
        const fatsValueDivideBy100 = productValues["fatFor100Grams"] / 100
        const protainsValueDivideBy100 = productValues["protainFor100Grams"] / 100
        carbohydrates.push(carbohydratesValueDivideBy100)
        fats.push(fatsValueDivideBy100)
        protains.push(protainsValueDivideBy100)
    }

    carbohydrates.push(totalCarbohydrates)
    fats.push(totalFats)
    protains.push(totalProtains)
    const equationSystem = [carbohydrates, fats, protains]
    return equationSystem
}

const EqualAlldependedToZeroAndPutNumbersInLeftAndVariablesInRight = (dependedEquationsArray) => {

    //make a copy of dependedEquationsArray
    const dependedEquationsArrayCopy = [...dependedEquationsArray]

    // loop on depended variable expressions
    dependedEquationsArray.forEach((value, equationNumber) => {

        //* eaual all variable expressions to 200 *
        dependedEquationsArrayCopy[equationNumber]["leftPartOfEquation"][0]["number"] = 0


        // * move numbers without variable to left side *
        const rightSideOfEquation = value["rightPartOfEquation"]
        // loop all items in right side of equation
        rightSideOfEquation.forEach((value, rightSideElementIndex) => {
            const variable = value["variable"]
            // if there isn't a variable to the item
            if (variable === "without") {

                // multiply it by -1
                dependedEquationsArrayCopy[equationNumber]["rightPartOfEquation"][rightSideElementIndex]["number"] *= -1

                // and add it to left side
                dependedEquationsArrayCopy[equationNumber]["leftPartOfEquation"][0]["number"] +=
                    dependedEquationsArrayCopy[equationNumber]["rightPartOfEquation"][rightSideElementIndex]["number"]

                //delete it from the right side 
                dependedEquationsArrayCopy[equationNumber]["rightPartOfEquation"].splice(rightSideElementIndex, 1)
            }
        })
    })

    return dependedEquationsArrayCopy


}
const CreateMatrixOfTheEquationWeOrederAbove = (equationsArray) => {
    let matrix = []

    // loop on  each equation in array
    equationsArray.forEach((value, index) => {
        // create row in matrix
        let rowInMatrix = []

        // get right side of equation
        let rightSideOfEquation = value["rightPartOfEquation"]

        // loop on elements on right side of equation
        rightSideOfEquation.forEach((value, index) => {

            // get the number of element
            const numberOfEalemnt = value["number"]

            // insert it to row in matrix that we created
            rowInMatrix.push(numberOfEalemnt)
        })

        // when we fill all the row with number of variables we will add the result of all the equation equal to 
        // so we get the left side 
        let leftSideOfEquation = value["leftPartOfEquation"]

        // and put it in the last item in row we created
        rowInMatrix.push(leftSideOfEquation[0]["number"])

        // and finally put all the finish row in the matrix
        matrix.push(rowInMatrix)
    })

    return matrix
}






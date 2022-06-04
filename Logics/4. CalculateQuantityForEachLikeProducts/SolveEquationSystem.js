export const SolveMatrix = (matrix) => {
    //To solve matrix we first need to rating it to canonic matrix 
    const canonicMatrix =
        CanonicalMatrigRating(matrix)

    // Now we will create each row in matrix an equation
    const equationToEachRowinMatrix =
        MatrixToEquations(canonicMatrix)


    // Now we create expression that represent the value of each variable
    const expressionToEachVarible =
        CreateExpressionToEachVarible(canonicMatrix, equationToEachRowinMatrix)

    return expressionToEachVarible
}


const CanonicalMatrigRating = (matrix) => {
    var rows = matrix.length;
    var columns = matrix[0].length;

    var lead = 0;
    for (var k = 0; k < rows; k++) {
        if (columns <= lead) return;

        var i = k;
        while (matrix[i][lead] === 0) {
            i++;
            if (rows === i) {
                i = k;
                lead++;
                if (columns === lead) return;
            }
        }
        var irow = matrix[i], krow = matrix[k];
        matrix[i] = krow, matrix[k] = irow;

        var val = matrix[k][lead];
        for (var j = 0; j < columns; j++) {
            matrix[k][j] /= val;
        }

        for (var i = 0; i < rows; i++) {
            if (i === k) continue;
            val = matrix[i][lead];
            for (var j = 0; j < columns; j++) {
                matrix[i][j] -= val * matrix[k][j];
            }
        }
        lead++;
    }

    return fixMatrixTo2DigitsAfterDot(matrix);
}
const fixMatrixTo2DigitsAfterDot = (matrix) => {
    let copyMatrix = [...matrix]
    copyMatrix.forEach((element, row) => {
        element.forEach((element, col) => {
            copyMatrix[row][col] = element
        })

    });
    return copyMatrix
}


const MatrixToEquations = (canonicMatrix) => {
    const equationArray = {}
    for (let rowNumber = 0; rowNumber < canonicMatrix.length; rowNumber++) {
        let rightPartOfEquation = [], leftPartOfEquation = []
        for (let itemIndex = 0; itemIndex < canonicMatrix[rowNumber].length; itemIndex++) {

            if (itemIndex === canonicMatrix[rowNumber].length - 1) {
                let itemObject = CreateEquationConnectorsObject(
                    canonicMatrix[rowNumber][itemIndex],
                    'without'
                )
                rightPartOfEquation.push(itemObject)
            } else {
                if (canonicMatrix[rowNumber][itemIndex] !== 0) {
                    const variableName = 'X' + (itemIndex + 1)
                    let itemObject = CreateEquationConnectorsObject(
                        canonicMatrix[rowNumber][itemIndex],
                        variableName
                    )
                    leftPartOfEquation.push(itemObject)
                }
            }

        }
        const equationObject = { rightPartOfEquation: rightPartOfEquation, leftPartOfEquation: leftPartOfEquation }
        equationArray[rowNumber + 1] = equationObject
    }
    return equationArray
}
const CreateEquationConnectorsObject = (connectorNumber, ConnerctorVariable) => {
    return {
        number: connectorNumber,
        variable: ConnerctorVariable
    }
}


const CreateExpressionToEachVarible = (canonicMatrix, equationToEachRowinMatrix) => {
    let result = {
        dependet: [],
        free: []
    }
    const numberOfVaribles = canonicMatrix[0].length - 1

    // loop on all the varibles in canonic matrix
    for (let variableNumber = 0; variableNumber < numberOfVaribles; variableNumber++) {

        // if the variable depended
        if (IsThisVaribleIsDependent(canonicMatrix, variableNumber) === true) {

            const extractiondependedVariable = ExtractiondependedVariable(equationToEachRowinMatrix, variableNumber)
            result["dependet"].push(extractiondependedVariable)

        } else {
            const leftPartOfEquation = CreateEquationConnectorsObject(1, "X" + (variableNumber + 1))
            const rightPartOfEquation = CreateEquationConnectorsObject('t' + (variableNumber + 1), 'without')

            const equationObject = { rightPartOfEquation: [rightPartOfEquation], leftPartOfEquation: [leftPartOfEquation] }
            result['free'].push(equationObject)
        }
    }
    return result
}
// in canonoc rating variable called "depended" if in his column there is open element
// element in matrix called "open element" if it the first element in row that is not zero.

// we get as parameter:
// 1. column we want to chek in it if their open element
// 2. the canic merix 
const IsThisVaribleIsDependent = (canonicMatrix, column) => {
    // loop on the canonic matrix rows

    for (let equationNumber = 0; equationNumber < canonicMatrix.length; equationNumber++) {
        // we go in the row to the column position and check if it open, if yes so
        // we found depended varaible
        if (IsOpenItem(canonicMatrix, equationNumber, column) === true) {
            return true
        }
    }
    return false

}
// element in matrix called "open element" if it the first element in row that is not zero.

// we get as parameter:
//   1. the column number of the item we want to check if it open item
//   2. the row number  of the item we want to check if it open item
//   3. the matrix we want to check on
const IsOpenItem = (matrix, equationNumber, column) => {
    let rowToCheck = matrix[equationNumber]

    // now we loop on all columns in this row until er get to item column 
    for (let index = 0; index <= column; index++) {
        // if we not get to column of item and there is number that is not zero 
        //so our item is not open
        if (index !== column && rowToCheck[index] !== 0) {
            return false
        }

        // if we get to column of item and until niw we not found any number different from zero so 
        // our item is open 
        if (index === column && rowToCheck[index] !== 0) {
            return true
        }

    }
}
const ExtractiondependedVariable = (equationToEachRowinMatrix, variableNumber) => {
    let equationToEachRowinMatrixCopy = Object.assign({}, equationToEachRowinMatrix)
    // get the left side of the equation
    const leftPartEquation = equationToEachRowinMatrixCopy[variableNumber + 1]["leftPartOfEquation"]

    ///loop on left side of equation  
    for (index = 0; index < leftPartEquation.length; index++) {
        if (leftPartEquation[index]["variable"] !== "X" + (variableNumber + 1)) {
            const number = leftPartEquation[index]["number"]
            equationToEachRowinMatrixCopy[variableNumber + 1]["leftPartOfEquation"][index]["number"] = number * -1
            const saveThisObject = equationToEachRowinMatrixCopy[variableNumber + 1]["leftPartOfEquation"][index]
            equationToEachRowinMatrixCopy[variableNumber + 1]["leftPartOfEquation"].splice(index, 1)
            index = index - 1
            equationToEachRowinMatrixCopy[variableNumber + 1]["rightPartOfEquation"].push(saveThisObject)
        }
    }
    return equationToEachRowinMatrixCopy[variableNumber + 1]
}
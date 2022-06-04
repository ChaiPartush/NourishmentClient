import { ConstantNodeDependencies } from "mathjs";

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
    return matrix;
}

const CreateEquationConnectorsObject = (connectorNumber, ConnerctorVariable) => {
    return {
        number: connectorNumber,
        variable: ConnerctorVariable
    }
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

const IsOpenItem = (matrix, row, column) => {
    let itemRow = matrix[row]
    for (let index = 0; index <= column; index++) {
        if (itemRow[index] !== 0 && index !== column) {
            return false
        }
        if (itemRow[index] !== 0 && index === column) {
            return true
        }

    }
}

const IsThisVaribleIsDependent = (canonicMatrix, column) => {
    for (let equationNumber = 0; equationNumber < canonicMatrix.length; equationNumber++) {
        if (IsOpenItem(canonicMatrix, equationNumber, column) === true) {
            return true
        }
    }
    return false

}

export const EquationSystemSolver = (matrix) => {
    const canonicMatrix = CanonicalMatrigRating(matrix)
    let result = {
        dependet: [],
        free: []
    }
    


    const CreateEaachRowToEquation = MatrixToEquations(canonicMatrix)

    const numberOfVaribles = canonicMatrix[0].length - 1
    for (let variableNumber = 0; variableNumber < numberOfVaribles; variableNumber++) {
        const indexToDelete = []
        if (IsThisVaribleIsDependent(canonicMatrix, variableNumber) === true) {
            const leftPartEquation = CreateEaachRowToEquation[variableNumber + 1]["leftPartOfEquation"]
            // leftPartEquation.forEach((element, index) => {
            for (index = 0; index < leftPartEquation.length; index++) {
                if (leftPartEquation[index]["variable"] !== "X" + (variableNumber + 1)) {
                    const number = leftPartEquation[index]["number"]
                    CreateEaachRowToEquation[variableNumber + 1]["leftPartOfEquation"][index]["number"] = number * -1
                    const saveThisObject = CreateEaachRowToEquation[variableNumber + 1]["leftPartOfEquation"][index]
                    CreateEaachRowToEquation[variableNumber + 1]["leftPartOfEquation"].splice(index, 1)
                    index = index - 1
                    CreateEaachRowToEquation[variableNumber + 1]["rightPartOfEquation"].push(saveThisObject)

                }
                // })
            }



            // indexToDelete.forEach((element) => {


            // })

            result['dependet'].push(CreateEaachRowToEquation[variableNumber + 1])



            // for (let index = 0; index < leftPartEquation.length; index++) {
            //  if (leftPartEquation[index]["variable"] !== "X" + (variableNumber + 1)) {

            // const number = leftPartEquation[index]["number"]
            // CreateEaachRowToEquation[variableNumber + 1]["leftPartOfEquation"][index]["number"] = number * -1
            // const saveThisObject = CreateEaachRowToEquation[variableNumber + 1]["leftPartOfEquation"][index]
            // CreateEaachRowToEquation[variableNumber + 1]["leftPartOfEquation"].splice(index, 1)
            // CreateEaachRowToEquation[variableNumber + 1]["rightPartOfEquation"].push(saveThisObject)
            // result['dependet'].push(CreateEaachRowToEquation[variableNumber + 1])

            //}


        } else {
            const leftPartOfEquation = CreateEquationConnectorsObject(1, "X" + (variableNumber + 1))
            const rightPartOfEquation = CreateEquationConnectorsObject('t' + (variableNumber + 1), 'without')

            const equationObject = { rightPartOfEquation: [rightPartOfEquation], leftPartOfEquation: [leftPartOfEquation] }
            result['free'].push(equationObject)
        }

    }
    return result
}






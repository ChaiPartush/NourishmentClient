

let pieChart = [
    { x: 1, y: 25 },
    { x: 2, y: 25 },
    { x: 3, y: 25 },
    { x: 4, y: 25 }
]


const copyArray = (lastArray) => {
    let newArray = []
    for (let index = 0; index < lastArray.length; index++) {
        const cell = lastArray[index]
        newArray[index] = cell
    }

    return newArray
}

export const EditPie = (piecesArray) => {
    pieChart = copyArray(piecesArray)
    // console.log('edit')
    // console.log(pieChart)
    return pieChart

}

// export const EditPie = (piecesArray) => {
//     setPieChart(piecesArray)
// }

export const getPie = () => {
    // console.log('get')
    // console.log(pieChart)
    return pieChart
}
// export const thingsContexr = () => {

//     e





// }
// export const ThingsContext = createContext([
//     { x: 1, y: 25 },
//     { x: 2, y: 25 },
//     { x: 3, y: 25 },
//     { x: 4, y: 25 }
// ])
// export const ThingsProvider = ThingsContext.Provider
export const copyArray = (lastArray) => {
    let newArray = []
    for (let index = 0; index < lastArray.length; index++) {
        const cell = lastArray[index]
        newArray[index] = cell
    }
    return newArray
}
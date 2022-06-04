import React, { useState } from 'react'

export const UpdatePie = ({ arr }) => {
    const parts = [
        { x: 1, y: 100 / mealsNumber },
        { x: 2, y: 100 / mealsNumber },
        { x: 3, y: 100 / mealsNumber },
        { x: 4, y: 100 / mealsNumber },
        { x: 5, y: 100 / mealsNumber },
        { x: 6, y: 100 / mealsNumber },
        { x: 7, y: 100 / mealsNumber },
        { x: 8, y: 100 / mealsNumber },
        { x: 9, y: 100 / mealsNumber },
        { x: 10, y: 100 / mealsNumber },
        { x: 11, y: 100 / mealsNumber },
        { x: 12, y: 100 / mealsNumber }]
    const [pieces, setPieces] = useState(parts.slice(0, mealsNumber))
    


    //let arr = parts.slice(0, mealsNumber)




    // if (precentByValue.id !== undefined) {
    //     if (arr[precentByValue.id] != precentByValue.precent) {
    //         const lastValue = arr[precentByValue.id].y
    //         arr[precentByValue.id] = {
    //             x: precentByValue.id + 1,
    //             y: precentByValue.precent
    //         }
    //         const difrrentToDivide = (arr[precentByValue.id].y - lastValue) / (mealsNumber - 1);
    //         for (let index = 0; index < arr.length; index++) {
    //             if (index !== precentByValue.id) {
    //                 arr[index].y = difrrentToDivide > 0 ? arr[index].y - Math.abs(difrrentToDivide) : arr[index].y + Math.abs(difrrentToDivide)

    //             }
    //         }
    //     }
    // }

    // console.log(pieces)

    return parts

}



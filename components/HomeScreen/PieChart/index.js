import React, { useState, useEffect, useContext } from "react";
import { PieChart } from './PieChart'
import { View, Text } from "react-native";
import { VictoryPie, VictoryLabel, VictoryTooltip, Slice } from 'victory-native'
import { width, height } from '../../../constants/ScreenDimentionConst'
import { Svg, G } from "react-native-svg";
import { diff } from "react-native-reanimated";
import { configureFonts } from "react-native-paper";
import { Pie } from "react-native-progress";
import { PiecesContext } from "../../Context/PiecesContext";
import { EditPie, getPie } from '../thingsContext'

const graphicColor = ['#B8B5FF'];

export const PieChartWithLines = ({ mealsNumber, precentByValue }) => {
    let changePrecentByValue = {}
    let numberOfMeals = 4
    // let pie = [
    //     { x: 1, y: 25 },
    //     { x: 2, y: 40 },
    //     { x: 3, y: 75 },
    //     { x: 4, y: 30 }
    // ]
    // const things = useContext(ThingsContext)

    const [pieStyle, setPieStyle] = useState([
        { x: 1, y: 25 },
        { x: 2, y: 25 },
        { x: 3, y: 25 },
        { x: 4, y: 25 }
    ]
    );

    //const things = useContext(ThingsContext)



    // const pieces = [{ x: 1, y: 25 },
    // { x: 2, y: 40 },
    // { x: 3, y: 75 },
    // { x: 4, y: 30 }]

    const copyArray = (lastArray) => {
        let newArray = []
        if (lastArray !== undefined) {
            for (let index = 0; index < lastArray.length; index++) {
                const cell = lastArray[index]
                newArray[index] = cell
            }
        }
        return newArray
    }

    const dataArray = (changePrecentByValue) => {

        let arr = copyArray(pieStyle)

        if (arr[changePrecentByValue.id] != changePrecentByValue.precent) {
            const lastValue = arr[changePrecentByValue.id].y

            arr[changePrecentByValue.id] = {
                x: changePrecentByValue.id + 1,
                y: changePrecentByValue.precent
            }



            const difrrentToDivide = (arr[changePrecentByValue.id].y - lastValue) / (mealsNumber - 1);


            for (let index = 0; index < arr.length; index++) {
                if (index !== changePrecentByValue.id) {
                    arr[index].y = difrrentToDivide > 0 ? arr[index].y - Math.abs(difrrentToDivide) : arr[index].y + Math.abs(difrrentToDivide)
                }
            }
        }
        return arr


    }

    const changeNumberOfMeals = (numberOfMealsAfterChange) => {
        const precentsBeforeMealsChange = copyArray(pieStyle)


        const numberOfMealsBeforeChange = precentsBeforeMealsChange.length;

        let precentsAfterMealsChange = null

        const howManyMeals = Math.abs(numberOfMealsAfterChange - numberOfMealsBeforeChange)


        if (numberOfMealsAfterChange < numberOfMealsBeforeChange) {

            let howManyPrecentsDecrease = 0;
            for (let index = 0; index < howManyMeals; index++) {
                howManyPrecentsDecrease += precentsBeforeMealsChange[numberOfMealsBeforeChange - index - 1].y
            }

            precentsAfterMealsChange = precentsBeforeMealsChange.slice(0, numberOfMealsAfterChange)

            const howManyPrecentsGetEachMeal = howManyPrecentsDecrease / numberOfMealsAfterChange
            for (let index = 0; index < precentsAfterMealsChange.length; index++) {
                precentsAfterMealsChange[index].y += howManyPrecentsGetEachMeal
            }

        }

        else if (numberOfMealsAfterChange > numberOfMealsBeforeChange) {
            precentsAfterMealsChange = precentsBeforeMealsChange.slice(0, numberOfMealsAfterChange - howManyMeals)
            for (let index = 1; index <= howManyMeals; index++) {
                precentsAfterMealsChange.push({ x: numberOfMealsBeforeChange + index, y: 100 / numberOfMealsAfterChange })
            }
            const howManyPrecentsDecrease = 100 / numberOfMealsAfterChange
            const howManyPrecentsDecreaseFromEachMeal = howManyPrecentsDecrease / (numberOfMealsAfterChange - howManyMeals)
            for (let index = 0; index < precentsAfterMealsChange.length - howManyMeals; index++) {
                precentsAfterMealsChange[index].y -= howManyPrecentsDecreaseFromEachMeal
            }

        }
        return precentsAfterMealsChange
    }



    // const pieChart = () => {

    //     if (precentByValue !== changePrecentByValue) {
    //         changePrecentByValue = precentByValue
    //         const arr = dataArray(changePrecentByValue)
    //         pieces = copyArray(arr)

    //     }
    //     if (mealsNumber !== numberOfMeals) {
    //         numberOfMeals = mealsNumber
    //         const arr2 = changeNumberOfMeals(numberOfMeals)
    //         pieces = copyArray(arr2)
    //     }
    //     return pieces
    // }

    const arrayEquals = (a, b) => {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }


    const haveSameData = (obj1, obj2) => {
        const obj1Length = Object.keys(obj1).length;
        const obj2Length = Object.keys(obj2).length;

        if (obj1Length === obj2Length) {
            return Object.keys(obj1).every(
                key => obj2.hasOwnProperty(key)
                    && obj2[key] === obj1[key]);
        }
        return false;
    }




    useEffect(() => {
        // if (arrayEquals(getPie(), pieStyle) === false) {
        //     setPieStyle(getPie())
        // }
        // if (precentByValue !== changePrecentByValue) {
        if (haveSameData(precentByValue, changePrecentByValue) === false) {
            changePrecentByValue = precentByValue
            const arr = dataArray(changePrecentByValue)
            // console.log('change precents')
            // console.log(arr)
            const editArray = EditPie(arr)
            setPieStyle(editArray)
        }
        if (mealsNumber !== numberOfMeals) {
            numberOfMeals = mealsNumber
            const arr2 = changeNumberOfMeals(numberOfMeals)
            const editArray2 = EditPie(arr2)
            setPieStyle(editArray2)
        }

    }, [mealsNumber, precentByValue])

















    return (




        <View>
            {/* <ThingsContext.Provider value={pieStyle}> */}




            <VictoryPie

                data={pieStyle}
                width={250}
                height={250}
                innerRadius={0}
                colorScale={graphicColor}

                cornerRadius={1}
                labelPosition={"centroid"}
                style={{

                    data: {
                        fillOpacity: 1, stroke: "white", strokeWidth: 3
                    },
                    labels: {
                        fill: "white",
                        fontWeight: 'bold',

                    }
                }}
                labelRadius={50}
            />
            {/* </ThingsContext.Provider> */}



        </View>

    )
}
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Animated, TouchableOpacity, FlatList } from 'react-native'
import { COLORS } from '../../constants/Colors'
import { width, height } from '../../constants/ScreenDimentionConst'
import { SIZES } from '../../constants/Sizes'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import SwitchSelector from "react-native-switch-selector";
import { FoodCard } from './FoodCard'
import * as Progress from 'react-native-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { configureFonts } from 'react-native-paper'
import { PiecesContext } from "../Context/PiecesContext";
import { ThingsContext } from '../HomeScreen/thingsContext'
import { EditPie, getPie } from '../HomeScreen/thingsContext'

export const CardMeal = ({ backgroundColor, index, mealsNumber, newPrecent, piePieces }) => {
    const [foodItemColums1, setfoodItemColums1] = useState([{ id: '1' }, { id: '2' }])
    const [foodItemColumn2, setfoodItemColums2] = useState([{ id: '3' }, { id: '4' }])
    const [idOfItemToDelete, setIdOfItemToDelete] = useState([]);
    const [precent, setPrecent] = useState((100 / mealsNumber));
    const [measurementMeal, setMeasurementMeal] = useState('grams')
    const [isValueChang, setIsValueChange] = useState(false)
    const sliderLength = (width * 55) / 100
    const [pices, setPices] = useState([
        { x: 1, y: 25 },
        { x: 2, y: 25 },
        { x: 3, y: 25 },
        { x: 4, y: 25 }
    ]
    );
    // const things = useContext(ThingsContext)


    const copyArray = (lastArray) => {
        let newArray = []
        for (let index = 0; index < lastArray.length; index++) {
            const cell = lastArray[index]
            newArray[index] = cell
        }
        return newArray
    }

    const arrayEquals = (a, b) => {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    useEffect(() => {
        if (arrayEquals(pices, getPie()) === false) {
            setPices(getPie())
        }

        if (precent !== pices[index].y) {
            setPrecent(pices[index].y)
        }
        // if (isValueChang === false) {
        //     setPrecent(100 / mealsNumber)
        // }

        // const newPices = copyArray(getPieces())

        // console.log(newPices)

        // if (getPieces() !== undefined) {
        //     console.log('new')
        //     console.log(getPieces())
        // }

    });

    const createPrecentMultiSlider = () => {
        return (
            <MultiSlider
                value={parseFloat(precent)}
                values={[parseFloat(precent)]}
                min={0.0}
                max={100.0}
                step={0.1}
                selectedStyle={{ backgroundColor: '#986D8E' }}
                unselectedStyle={{ backgroundColor: '#B2B1B9' }}
                trackStyle={{ height: 8, borderRadius: 8, backgroundColor: COLORS.lightGray2 }}
                touchDimensions={{ borderRadius: 100 }}
                sliderLength={sliderLength}
                customMarker={(e) => {
                    return (
                        <View>
                            <View
                                style={{
                                    height: 25,
                                    width: 25,
                                    top: 3,
                                    borderRadius: 15,
                                    borderWidth: 2,
                                    borderColor: '#FEF1E6',
                                    backgroundColor: '#DF711B',
                                }}
                            ></View>
                        </View>
                    )
                }}
                onValuesChange={(value) => {
                    setIsValueChange(true)
                    setPrecent(value)

                }}

                onValuesChangeFinish={(value) => newPrecent(value)}
            />
        )
    }
    const deleteItem = (columnItems) => {
        const dataWithoutDeletedItem = []
        for (let index = 0; index < columnItems.length; index++) {
            if (!idOfItemToDelete.includes(columnItems[index].id)) {
                dataWithoutDeletedItem.push(columnItems[index])
            }
        }
        return dataWithoutDeletedItem
    }


    return (
        <View style={{
            backgroundColor: backgroundColor,
            marginBottom: height * 0.03,
            marginTop: height * 0.05,
            marginHorizontal: width * 0.05,
            borderWidth: 2,
            borderRadius: 11,
            flexDirection: 'column',
            justifyContent: 'space-between',





        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#676FA3', elevation: 20, borderBottomRightRadius: 10, borderTopLeftRadius: 10, textAlign: 'center', width: width * 0.1, height: height * 0.04, backgroundColor: '#FFF8F3', fontWeight: 'bold', fontSize: height * 0.025 }}>{index + 1}</Text>
                <Progress.Circle progress={0.6} showsText={true} borderWidth={0.8} borderColor='black' textStyle={{ fontSize: height * 0.02 }} style={{ padding: 1 }} />
                <SwitchSelector

                    initial={0}
                    textColor={'#7a44cf'} //'#7a44cf'
                    selectedColor={'white'}
                    buttonColor={'#7a44cf'}
                    height={height * 0.035}
                    onPress={(value) => { setMeasurementMeal(value) }}
                    borderColor={'#7a44cf'}
                    borderRadius={5}
                    hasPadding
                    style={{ width: width * 0.35, alignItems: 'center' }}
                    options={[
                        { label: "Weighing", value: "grams" },
                        { label: "Spoons", value: "Spoons" }
                    ]}
                />
                <TouchableOpacity style={{ margin: 5 }}>
                    <AntDesign name="closecircleo" size={25} color={'black'} />
                </TouchableOpacity>

            </View>



            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 30, padding: 5, borderWidth: 2, borderColor: '#B762C1', elevation: 8 }}>
                    <Text style={{ color: '#B762C1', fontWeight: 'bold' }}>Add Food</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 30, padding: 5, borderWidth: 2, borderColor: '#B762C1', elevation: 8 }}>
                    <Text style={{
                        color: '#B762C1', fontWeight: 'bold'
                    }}>Change Meal Food</Text>
                </TouchableOpacity>



            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', borderWidth: 2, borderColor: '#9145B6', elevation: 10, width: width * 0.82, borderRadius: 10, marginLeft: 18 }}>
                <View>{createPrecentMultiSlider()}</View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', left: 12 }}>
                    <Text style={{
                        fontSize: 25,

                        fontWeight: 'bold',
                        color: '#8F4068'
                    }}>
                        {parseFloat(precent).toFixed(1).toString()}


                    </Text>
                    <Text style={{
                        fontSize: 18,
                        color: '#8D8E98'
                    }}>%</Text>
                </View>


            </View>



            <View style={{
                flexDirection: 'row',

                justifyContent: 'center'

            }}>
                <FlatList
                    data={foodItemColums1}
                    renderItem={({ item }) => (
                        item.isClose != false &&
                        <FoodCard id={item.id} measurementMeal={measurementMeal} onPress={(value) => {
                            setIdOfItemToDelete([idOfItemToDelete.push(value)])
                            setfoodItemColums1(deleteItem(foodItemColums1))
                        }} />
                    )}
                    numColumns={1}
                    listKey={(item, index) => index.toString()}
                />

                <FlatList
                    data={foodItemColumn2}
                    renderItem={({ item }) => (
                        item.isClose != false &&
                        <FoodCard id={item.id} measurementMeal={measurementMeal} onPress={(value) => {
                            setIdOfItemToDelete([idOfItemToDelete.push(value)])
                            setfoodItemColums2(deleteItem(foodItemColumn2))
                        }} />
                    )}
                    numColumns={1}
                    listKey={(item, index) => index.toString()}
                />

                {/* <FlatList
                    data={data1}
                    renderItem={({ item }) => (
                        <FoodCard />
                    )}
                    numColumns={1}
                    listKey={(item, index) => index.toString()}
                /> */}

            </View>

        </View>
    )

}
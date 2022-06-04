import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { COLORS } from '../../constants/Colors'
import SwitchSelector from "react-native-switch-selector";
import { SIZES } from '../../constants/Sizes'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Collapsible from 'react-native-collapsible';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { width, height } from '../../constants/ScreenDimentionConst'
import AwesomeButton from "react-native-really-awesome-button";
import { isScale } from 'react-native-redash';

export const FoodCard = ({ onPress, id, measurementMeal }) => {


    const [collapsedChageQuantity, setCollapsedChageQuantity] = useState(true)
    const [collapsedChageFoodType, setCollapsedChageFoodType] = useState(true)
    const [collapsedChageMeasurement, setCollapsedChageMeasurement] = useState(true)
    const [quantity, setQuantity] = useState(100.0)
    const [measurementFood, setMeasurementFood] = useState('grams')
    const [newMeasurementMeal, setNewMeasurementMeal] = useState('grams')
    const [realMeasure, setRealMeasure] = useState('grams')
    const [click, setClick] = useState(false)
    const func1 = () => {

        if (click === true && measurementFood !== measurementMeal) {

            return measurementFood;
        }
        else {

            return measurementMeal;
        }
    }


    useEffect(() => {
        if (newMeasurementMeal !== measurementMeal) {
            setRealMeasure(measurementMeal)
            setNewMeasurementMeal(measurementMeal)
        }


    });





    const createPrecentMultiSlider = () => {
        return (
            <MultiSlider
                value={parseFloat(quantity)}
                min={100}
                max={200.0}
                step={1}
                selectedStyle={{ backgroundColor: '#986D8E' }}
                unselectedStyle={{ backgroundColor: '#B2B1B9' }}
                trackStyle={{ height: height * 0.0122, borderRadius: 8, backgroundColor: COLORS.lightGray2 }}
                touchDimensions={{ borderRadius: 100 }}
                sliderLength={(width * 0.35)}
                customMarker={(e) => {
                    return (
                        <View>
                            <View
                                style={{
                                    height: 20,
                                    width: 20,
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

                    setQuantity(value)
                }}
            />
        )
    }

    return (

        <View style={{ backgroundColor: COLORS.light, elevation: 20, flexDirection: 'column', margin: width * 0.03 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>

                <TouchableOpacity onPress={() => {
                    onPress(id)


                }}>
                    <AntDesign name="closecircleo" size={15} color={'black'} />
                </TouchableOpacity>


                <TouchableOpacity>
                    <Ionicons name="checkmark-circle-outline" size={19} color={'black'} />
                </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>

                <View style={{ flexDirection: 'column' }}>


                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <AwesomeButton
                            type='primary'
                            height={height * 0.03}
                            width={width * 0.09}
                            backgroundColor={COLORS.lightGray1}
                            borderRadius={2}
                            raiseLevel={3}
                            onPress={() => setCollapsedChageQuantity(!collapsedChageQuantity)}
                        >
                            <Text style={{ fontWeight: 'bold', color: '#A267AC', fontSize: 15, alignItems: 'center' }}>{quantity}</Text>
                        </AwesomeButton>

                        <AwesomeButton
                            type='primary'
                            height={height * 0.022}
                            style={{ marginLeft: 1 }}

                            width={width * 0.09}
                            backgroundColor={COLORS.lightGray1}
                            borderRadius={2}
                            raiseLevel={3}
                            onPress={() => setCollapsedChageMeasurement(!collapsedChageMeasurement)}

                        >
                            <Text style={{
                                fontSize: height * 0.012,
                                color: '#92A9BD',
                                alignItems: 'center',
                                fontWeight: 'bold',
                            }}>{
                                    realMeasure
                                }</Text>
                        </AwesomeButton>


                    </View>



                    <Text style={{
                        fontSize: 18,
                        color: '#35858B',
                        alignItems: 'center',
                        fontWeight: 'bold',

                    }}>Chicken</Text>
                </View>




                <Image
                    source={require('../../assets/images/Food/CHICKEN.png')}
                    resizeMode='contain'
                    style={{
                        width: width * 0.2,
                        height: 50,
                        left: width * 0.0001

                    }}
                />



            </View>

            <Collapsible collapsed={collapsedChageQuantity} style={{ alignItems: 'center' }} >
                {createPrecentMultiSlider()}
            </Collapsible>

            <Collapsible collapsed={collapsedChageMeasurement} style={{ alignItems: 'center' }} >
                <SwitchSelector
                    initial={0}
                    textColor={'#7a44cf'}
                    value={realMeasure === 'grams' ? 0 : 1}
                    selectedColor={'white'}
                    buttonColor={'#7a44cf'}
                    height={height * 0.035}
                    onPress={value => { setRealMeasure(value) }}
                    borderColor={'#7a44cf'}
                    borderRadius={5}
                    hasPadding
                    style={{ width: width * 0.35 }}
                    options={[
                        { label: "Weighing", value: "grams" },
                        { label: "Spoons", value: "Spoons" }
                    ]}
                />
            </Collapsible>



            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => setCollapsedChageFoodType(!collapsedChageFoodType)}>
                    <Text style={{ color: COLORS.gray, fontWeight: 'bold' }}>replace food</Text>
                </TouchableOpacity>
            </View>

            <Collapsible collapsed={collapsedChageFoodType}  >
                <View style={{ flexDirection: 'column', backgroundColor: COLORS.lightGray }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <Ionicons name="checkmark-circle-outline" size={19} color={'black'} />
                        <Text>Beef</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <Ionicons name="checkmark-circle-outline" size={19} color={'black'} />
                        <Text>Chease</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <Ionicons name="checkmark-circle-outline" size={19} color={'black'} />
                        <Text>Other</Text>
                    </TouchableOpacity>

                </View>
            </Collapsible>



        </View >

    )

}
import React, { useState, useRef } from 'react'
import { View, Text, Image, StyleSheet, Animated, Platform, Pressable, FlatList, TouchableOpacity } from 'react-native'
import { width, height } from '../../../constants/ScreenDimentionConst'
const PLACES_ITEM_SIZE = Platform.OS === 'ios' ? width / 1.35 : width / 1.25
const EMPTY_ITEM_SIZE = (width - PLACES_ITEM_SIZE) / 2
import { COLORS } from '../../../constants/Colors'
import { FONTS } from '../../../constants/Fonts'
import { SIZES } from '../../../constants/Sizes'
import { targets } from '../../../constants/Data/QuestionsToUser/ChooseTarget/targets'
import { TargetType } from '../../../constants/Logics/ChangeCaloriesByTargetConsts'
import AwesomeButton from "react-native-really-awesome-button"
import * as Animatable from 'react-native-animatable'
// import { styles } from '../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseCarbohydratesStyle'
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
import {
    AntDesign,
    FontAwesome,
    MaterialCommunityIcons
} from "@expo/vector-icons";

const Card = ({ plant, favoriteProducts }) => {
    const [favorite, setFavorite] = useState(false);
    return (

        <Animatable.View animation={'bounceInRight'} duration={1000}
        // style={[styles.cardContainer]}
        >

            <View
            //style={[styles.cardIconContainer]}
            >
                <TouchableOpacity
                    onPress={() => {
                        favoriteProducts({ type: !favorite, name: plant.name })
                        setFavorite(!favorite)

                    }}>
                    <Image
                        // source={ICONS.love}
                        style={[styles.cardIcon, { tintColor: favorite ? COLORS.primary : COLORS.gray }]}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'stretch' }}>
                <View style={{ height: 100, alignItems: 'center', }}>
                    <Image source={{ uri: plant.img }} style={{ flex: 1, height: height * 0.3, width: width * 0.4, resizeMode: 'contain' }} />
                </View>

                <Text style={{ fontWeight: 'bold', fontSize: 17, textAlign: 'center', marginTop: 15 }}>{plant.name}</Text>

            </View>



        </Animatable.View >

    )
}

const Aa = ({ plant }) => {
    return (

        <Animatable.View animation={'bounceInRight'} duration={1000} style={{
            flex: 1,
            alignItems: 'center',
            marginBottom: height * 0.05




        }}>
            {/* <AwesomeButton
               height={height*0.18}
               width={width*0.6}
               borderRadius={30}
               raiseLevel={7}
              
            
               
               
            >
                Primary
            </AwesomeButton> */}









        </Animatable.View>)
}

const actionSimulation = (next) => {
    setTimeout(() => {
        next();
    }, 1000);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 32,
        backgroundColor: '#ecf0f1',
    },

});


export const ScrollTargets = ({ onpress }) => {
    const placesScrollX = useRef(new Animated.Value(0)).current;
    const [places, setPlaces] = useState([{ id: -1 }, ...targets, { id: -2 }])
    const [searchPlaces, setSearchPlaces] = useState(null)
    const [selected, setSlected] = useState(null)
    const [press, setPress] = useState(null)

    return (
        <Animatable.View animation={'bounceInUp'} duration={2000} style={{ flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'space-evenly', marginTop: height * 0.01, marginBottom: 10 }}>


            <AwesomeButton
                type="facebook"
                onPress={() => onpress(TargetType.GainWeight)}
                width={width * 0.70}
                height={height * 0.17}
                borderRadius={15}
                backgroundColor={'#F6E7D8'}
                backgroundDarker={'#AD8B73'}
                borderColor={'#E5E3C9'}
                borderWidth={3}
                raiseLevel={8}
            >
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <AntDesign
                        style={{}}
                        name="twitter"
                        size={height * 0.06}
                        color="white"
                    />
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ marginTop: 10, color: '#CEAB93', fontWeight: 'bold', fontSize: height * 0.03 }}>Gain Weight</Text>



                    </View>

                </View>



            </AwesomeButton>

            <AwesomeButton

                type="facebook"
                onPress={() => onpress(TargetType.BalancedDiet)}
                width={width * 0.70}
                height={height * 0.17}
                borderRadius={15}
                backgroundColor={'#F6E7D8'}
                backgroundDarker={'#AD8B73'}
                borderColor={'#E5E3C9'}
                borderWidth={3}
                raiseLevel={8}
            >

                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <AntDesign
                        style={{}}
                        name="twitter"
                        size={height * 0.06}
                        color="white"
                    />
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ marginTop: 10, color: '#CEAB93', fontWeight: 'bold', fontSize: height * 0.03 }}>Balanced diet</Text>



                    </View>

                </View>

            </AwesomeButton>

            <AwesomeButton

                type="facebook"
                onPress={() => onpress(TargetType.LossWeight)}
                width={width * 0.70}
                height={height * 0.17}
                borderRadius={15}
                backgroundColor={'#F6E7D8'}
                backgroundDarker={'#AD8B73'}
                borderColor={'#E5E3C9'}
                borderWidth={3}
                raiseLevel={8}
            >

                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <AntDesign
                        style={{}}
                        name="twitter"
                        size={height * 0.06


                        }
                        color="white"
                    />
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ marginTop: 10, color: '#CEAB93', fontWeight: 'bold', fontSize: height * 0.03 }}>Lose Weight</Text>



                    </View>

                </View>

            </AwesomeButton>














        </Animatable.View>
        // < FlatList
        //     showsVerticalScrollIndicator={false}
        //     data={targets}
        //     renderItem={({ item }) => {
        //         return <Aa plant={item} />
        //     }}

        //     keyExtractor={item => item.id}
        // />












    )


    const onScroll = (event) => {
        const xPos = event.nativeEvent.contentOffset;
        const current = Math.floor(xPos.x / 300);
        onpress(current)
    }

    // const data = selected ? searchPlaces : places
    // return (
    //     <Animated.FlatList
    //         horizontal

    //         pagingEnabled
    //         showsHorizontalScrollIndicator={false}
    //         data={data}
    //         keyExtractor={item => `${item.id}`}
    //         contentContainerStyle={{
    //             alignItems: 'center'
    //         }}
    //         snapToAlignment="center"
    //         snapToInterval={Platform.OS === 'ios' ? PLACES_ITEM_SIZE + 28 : PLACES_ITEM_SIZE}
    //         scrollEventThrottle={16}
    //         decelerationRate={0}
    //         bounces={false}
    //         onScroll={

    //             Animated.event([
    //                 {
    //                     nativeEvent: {
    //                         contentOffset: { x: placesScrollX },
    //                     },


    //                 }
    //             ], { useNativeDriver: false })



    //         }


    //         // onMomentumScrollEnd={onScroll}
    //         renderItem={({ item, index }) => {

    //             const opacity = placesScrollX.interpolate({
    //                 inputRange: [
    //                     (index - 2) * PLACES_ITEM_SIZE,
    //                     (index - 1) * PLACES_ITEM_SIZE,
    //                     index * PLACES_ITEM_SIZE
    //                 ],
    //                 outputRange: [0.5, 0.89, 0.5],
    //                 extrapolate: 'clamp'
    //             })

    //             let activeHeight = 0;
    //             if (Platform.OS === 'ios') {
    //                 if (height > 800) {
    //                     activeHeight = height / 2
    //                 } else {
    //                     activeHeight = height / 1.65
    //                 }
    //             } else {
    //                 activeHeight = height / 1.6
    //             }

    //             const heightMoving = placesScrollX.interpolate({
    //                 inputRange: [
    //                     (index - 2) * PLACES_ITEM_SIZE - 20,
    //                     (index - 1) * PLACES_ITEM_SIZE - 170,
    //                     index * PLACES_ITEM_SIZE - 20
    //                 ],
    //                 outputRange: [height / 2.24,
    //                     activeHeight, height / 2.25],
    //                 extrapolate: 'clamp'
    //             })

    //             if (index == 0 || index == places.length - 1) {
    //                 return (
    //                     <View
    //                         style={{

    //                             width: EMPTY_ITEM_SIZE - 18
    //                         }}
    //                     />
    //                 )
    //             } else {
    //                 return (
    //                     <AnimatedPressable
    //                         onPress={() => {
    //                             setPress(item.name)
    //                             onpress(item.name)

    //                         }}
    //                         opacity={opacity}
    //                         style={{
    //                             width: PLACES_ITEM_SIZE - 3,

    //                             height: heightMoving,
    //                             alignItems: 'center',
    //                             borderRadius: 20,
    //                             padding: 10,



    //                         }}

    //                     >


    //                         <Image

    //                             source={item.image}
    //                             resizeMode="cover"
    //                             style={{
    //                                 position: 'absolute',
    //                                 width: '100%',
    //                                 height: '100%',
    //                                 borderRadius: 20,

    //                             }}
    //                         />

    //                         <View style={{
    //                             flex: 1,
    //                             alignItems: 'center',
    //                             justifyContent: 'flex-end',
    //                             marginHorizontal: SIZES.padding
    //                         }}>

    //                             <Text style={{ marginBottom: SIZES.radius, color: COLORS.white, ...FONTS.h1 }}>{item.name}</Text>
    //                             <Text style={{ marginBottom: SIZES.padding, color: COLORS.white, ...FONTS.body3 }}>{(press === item.name) ? 'aaa' : item.description}</Text>
    //                         </View>

    //                     </AnimatedPressable>


    //                 )
    //             }

    //         }}



    //     />

    // )

}
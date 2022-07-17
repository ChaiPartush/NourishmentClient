import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { COLORS } from '../../../../constants/Colors'
import * as Animatable from 'react-native-animatable'
import { styles } from '../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseCarbohydratesStyle'
import { ICONS } from '../../../../constants/Icons'
import { height, width } from '../../../../constants/ScreenDimentionConst';
import { Colors } from '../../../../colors';
import { MaterialIcons, MaterialCommunityIcons, FontAwesomeIcon } from '@expo/vector-icons';
import { index } from 'mathjs';


const ShowImage = ({ plant }) => {
    if (plant.img !== "") {
        return (
            <View style={{ alignItems: 'center', height: height * 0.1 }}>
                <Image style={{ flex: 1, width: width * 0.3, resizeMode: 'center', justifyContent: 'center', top: 3, borderRadius: 15 }}
                    source={{ uri: plant.img }}


                />
            </View>
        )
    } else {
        return (
            <View style={{ height: 100, alignItems: 'center', }}></View>
        )
    }
}
export const CardChooseFood = ({ plant, isScroll, favoriteProducts, isFavorite }) => {


    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        if (isFavorite === true) {
            setFavorite(true)
        }
    }, [isFavorite])

    return (
        <Animatable.View
            // onTouchStart={(event) => {
            //     favoriteProducts({ type: !favorite, name: plant.name })

            //     if (isScroll === false) {
            //         setFavorite(!favorite)
            //     }
            // }}
            // animation={'bounceInRight'} duration={1000}
            style={[styles.cardContainer]}>
            <View
                onTouchStart={() => {
                    // favoriteProducts({ type: !favorite, name: plant.name })
                    // setFavorite(!favorite)
                }}
                style={[styles.cardIconContainer]}>
                <TouchableOpacity
                    onPress={() => {
                        favoriteProducts({ type: !favorite, name: plant.name })
                        setFavorite(!favorite)

                    }}
                >
                    {
                        favorite ? <MaterialCommunityIcons name="cards-heart" size={height * 0.026} color={"#EB4747"} /> :
                            <MaterialCommunityIcons name="heart-outline" size={height * 0.026} color={"#224854"} />
                    }


                    {/* <Image
                        source={ICONS.love}
                        style={[{

                            width: width * 0.045,
                            height: height * 0.02,
                        }, { tintColor: favorite ? "red" : COLORS.gray }]}
                    /> */}
                </TouchableOpacity>
            </View>

            <View style={{ top: 10 }}>

                <ShowImage plant={plant} />

                {/* <View style={{ height: 100, alignItems: 'center', }}>


                    <Image source={{ uri: plant.img }} style={{ flex: 1, height: height * 0.3, width: width * 0.4, resizeMode: 'contain' }} />


                </View> */}

                <Text style={{
                    // fontWeight: 'bold', fontSize: 17, textAlign: 'center', marginTop: 15
                    fontFamily: "Fredoka-Regular",
                    fontSize: height * 0.02,
                    // fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#224854',
                    marginTop: height * 0.02,
                    marginBottom: height * 0.01
                }}>{plant.hebrewName}</Text>

            </View>
        </Animatable.View >
    )
}

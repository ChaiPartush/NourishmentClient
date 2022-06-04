import React, { useState } from 'react'
import { View, Animated, TouchableHighlight, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from '../../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseProtainsStyle'
import { COLORS } from '../../../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ICONS } from '../../../../../constants/Icons';
import { height, width } from '../../../../../constants/ScreenDimentionConst';

export const CardChooseProtainsComponent = ({ food }) => {
    const [favorite, setFavorite] = useState(false);
    return (
        <View>
            {/* underlayColor={COLORS.white}
            activeOpacity={0.9}> */}

            <View style={[styles.card, { flexDirection: 'column' }]}>

                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                        <Image
                            source={ICONS.love}
                            style={{
                                margin:10,
                                width: 20,
                                height: 20, tintColor: favorite ? COLORS.primary : COLORS.gray
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'stretch' }}>
                    <View style={{ height: 100, alignItems: 'center', }}>
                        <Image source={{ uri: food.img }} style={{ flex: 1, height: height * 0.3, width: width * 0.4, resizeMode: 'contain' }} />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 17, textAlign: 'center', marginTop: 25 }}>{food.name}</Text>

                </View>
                {/* <Animated.View
                    style={{ alignItems: 'center', top: -40 }}>
                    <Animated.Image source={{ uri: food.img }} style={{ height: 120, width: 120 }} />
                </Animated.View>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{food.name}</Text> */}

                {/* <View
                    style={{
                        marginTop: 10,
                        marginHorizontal: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}> */}
                {/* <View style={styles.addToCartBtn}>
                        <Icon name="add" size={20} color={COLORS.white} />
                    </View> */}
                {/* </View> */}
            </View>
        </View>
    );

}
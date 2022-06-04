import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { COLORS } from '../../../../constants/Colors'
import * as Animatable from 'react-native-animatable'
import { styles } from '../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseCarbohydratesStyle'
import { ICONS } from '../../../../constants/Icons'
import { height, width } from '../../../../constants/ScreenDimentionConst';
export const CardChooseFood = ({ plant, favoriteProducts }) => {
    
    const [favorite, setFavorite] = useState(false);
    return (
        <Animatable.View animation={'bounceInRight'} duration={1000} style={[styles.cardContainer]}>
            <View style={[styles.cardIconContainer]}>
                <TouchableOpacity
                    onPress={() => {
                        favoriteProducts({ type: !favorite, name: plant.name })
                        setFavorite(!favorite)

                    }}>
                    <Image
                        source={ICONS.love}
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
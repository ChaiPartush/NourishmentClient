import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { COLORS } from '../../../../../constants/Colors'
import { styles } from '../../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseCarbohydratesStyle'
import { ICONS } from '../../../../../constants/Icons'

export const CardChooseCarbohydratesComponent = ({ containerStyle, item }) => {
    const [favorite, setFavorite] = useState(false);
    return (
        <View style={[styles.cardContainer, { ...containerStyle }]}>
            <View style={styles.cardIconContainer}>
                <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                    <Image
                        source={ICONS.love}
                        style={[styles.cardIcon, { tintColor: favorite ? COLORS.primary : COLORS.gray }]}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.cardContainerImage}>
                <Image source={item.image} style={styles.cardImage} />
            </View>

            <View style={styles.cardTextContainer}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
            </View >
        </View >
    )
}

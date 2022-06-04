import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { COLORS } from '../../../../../constants/Colors'
import { styles } from '../../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseCarbohydratesStyle'
import { ICONS } from '../../../../../constants/Icons'
import { height, width } from '../../../../../constants/ScreenDimentionConst';

export const CardChooseCarbohydratesComponent = ({ item }) => {
    const [favorite, setFavorite] = useState(false);
    return (
        <View style={[styles.cardContainer]}>
            <View style={[styles.cardIconContainer]}>
                <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                    <Image
                        source={ICONS.love}
                        style={[styles.cardIcon, { tintColor: favorite ? COLORS.primary : COLORS.gray}]}
                    />
                </TouchableOpacity>
            </View>

            {/* <View style={styles.cardContainerImage}>
                <Image source={item.img} style={styles.cardImage} />
            </View>

            <View style={styles.cardTextContainer}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
            </View > */}

            <View style={{ alignItems: 'stretch' }}>
                <View style={{ height: 100, alignItems: 'center', }}>
                    <Image source={{ uri: item.img }} style={{ flex: 1, height: height * 0.3, width: width * 0.4, resizeMode: 'contain' }} />
                </View>

                <Text style={{ fontWeight: 'bold', fontSize: 17, textAlign: 'center', marginTop: 15 }}>{item.name}</Text>

            </View>
        </View >
    )
}

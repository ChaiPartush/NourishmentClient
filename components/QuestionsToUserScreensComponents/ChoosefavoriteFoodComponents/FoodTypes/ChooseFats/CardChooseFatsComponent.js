import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { styles } from '../../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseFatsStyle'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../../../../constants/Colors';
import { width, height } from '../../../../../constants/ScreenDimentionConst'

export const CardChooseFatsComponent = ({ plant }) => {
    const [like, setLike] = useState(false)
    return (
        <View
            activeOpacity={0.8}


        >
            {/* onPress={() => navigation.navigate('Details', plant)}> */}
            <View style={styles.card}>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity

                        onPress={() => setLike(!like)}

                        style={{
                            width: 30, height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center',
                            backgroundColor: plant.like
                                ? 'rgba(245, 42, 42,0.2)'
                                : 'rgba(0,0,0,0.2) '
                        }}>
                        <Icon name="favorite" size={18} color={like ? 'red' : 'black'} />
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'stretch' }}>
                    <View style={{ height: 100, alignItems: 'center', }}>
                        <Image source={{ uri: plant.img }} style={{ flex: 1, height: height * 0.3, width: width * 0.4, resizeMode: 'contain' }} />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 17, textAlign: 'center', marginTop: 15 }}>{plant.name}</Text>

                </View>


                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, }}>
                    <Text style={{ fontSize: 19, fontWeight: 'bold' }}>${plant.price}</Text>
                    <View style={{ height: 25, width: 25, backgroundColor: 'green', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, color: COLORS.white, fontWeight: 'bold' }}>+</Text>
                    </View>
                </View> */}
            </View>
        </View>
    )

}
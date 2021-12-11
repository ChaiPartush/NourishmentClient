import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { styles } from '../../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseFatsStyle'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../../../constants/Colors';

export const CardChooseFatsComponent = ({ plant }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}>
            {/* onPress={() => navigation.navigate('Details', plant)}> */}
            <View style={styles.card}>
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={{
                        width: 30, height: 30, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
                        backgroundColor: plant.like
                            ? 'rgba(245, 42, 42,0.2)'
                            : 'rgba(0,0,0,0.2) '
                    }}>
                        <Icon name="favorite" size={18} color={plant.like ? 'red' : 'black'} />
                    </View>
                </View>

                <View style={{ height: 100, alignItems: 'center', }}>
                    <Image source={plant.img} style={{ flex: 1, resizeMode: 'contain' }} />
                </View>

                <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>{plant.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, }}>
                    <Text style={{ fontSize: 19, fontWeight: 'bold' }}>${plant.price}</Text>
                    <View style={{ height: 25, width: 25, backgroundColor: 'green', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, color: COLORS.white, fontWeight: 'bold' }}>+</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )

}
import React from 'react'
import { View, Image, Text } from 'react-native'
import { styles } from '../../../Styles/QuestionsToUserStyles/ChooseLifestyleStyle'
import { COLORS } from '../../../constants/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const BottomCardChooseLifestyleComponent = ({ furniture }) => {
    return (
        <View style={styles.popularItemCard}>
            <View style={styles.iconContainer}>
                <Icon
                    name="heart"
                    color={furniture.liked ? 'red' : COLORS.primary}
                />
            </View>
            <Image
                source={furniture.image}
                style={{
                    width: 100,
                    height: '100%',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    marginRight: 10,
                }}
            />
            <View style={{ paddingVertical: 15, justifyContent: 'center' }}>
                <Text style={styles.cardName}>{furniture.name}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.price}>{furniture.price}</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Icon name="star" color={'yellow'} size={18} />
                        <Text style={styles.rating}>4.3</Text>
                    </View>
                </View>
            </View>
        </View>
    )

}
import React from 'react'
import { View, Pressable, Image, Text } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import * as Animatable from 'react-native-animatable'
import { height } from '../../../constants/ScreenDimentionConst'
import { styles } from '../../../Styles/QuestionsToUserStyles/ChooseLifestyleStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export const CardChooseLifestyleComponent = ({ furniture }) => {
    return (
        <Pressable
            onPress={() => navigation.navigate('DetailsChooseProblem', furniture)}>
            <Animatable.View style={styles.card}>
                <View style={styles.iconContainer}>
                    <Icon
                        name="heart"
                        color={furniture.liked ? 'red' : COLORS.primary2}
                    />
                </View>
                <Image
                    source={furniture.image}
                    style={{ height: height * 0.2, width: '100%', borderRadius: 10 }}
                />

                <Text style={styles.cardName}>{furniture.name}</Text>
                <View
                    style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={styles.price}>{furniture.price}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="star" color={'red'} size={18} />
                        <Text style={styles.rating}>4.3</Text>
                    </View>
                </View>
            </Animatable.View >
        </Pressable>
    )

}
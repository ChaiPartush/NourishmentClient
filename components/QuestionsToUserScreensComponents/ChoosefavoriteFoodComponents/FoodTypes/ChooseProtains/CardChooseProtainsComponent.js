import React from 'react'
import { View, Animated, TouchableHighlight, Text } from 'react-native'
import { styles } from '../../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseProtainsStyle'
import { COLORS } from '../../../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CardChooseProtainsComponent = ({ food }) => {
    //animationrotate.start();
    return (
        <TouchableHighlight
            underlayColor={COLORS.white}
            activeOpacity={0.9}>

            <View style={styles.card}>
                <Animated.View
                    //  animation={"fadeInUp"}  duration={2000} delay={100}
                    style={{ alignItems: 'center', top: -40 }}>
                    <Animated.Image source={food.image} style={{ height: 120, width: 120 }} />
                </Animated.View>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{food.name}</Text>
                    <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
                        {food.ingredients}
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: 10,
                        marginHorizontal: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        ${food.price}
                    </Text>
                    <View style={styles.addToCartBtn}>
                        <Icon name="add" size={20} color={COLORS.white} />
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

}
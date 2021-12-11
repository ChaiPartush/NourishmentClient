import React from 'react'
import { View, TouchableOpacity, Animated, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../../Styles/QuestionsToUserStyles/ChooseProblemStyle'
import {COLORS} from '../../../constants/Colors'
import { width } from '../../../constants/ScreenDimentionConst'

export const CardChooseHealthProblemComponent = ({ hotel, index, scrollX, activeCardIndex }) => {
    const cardWidth = width / 1.8;

    const inputRange = [
        (index - 1) * cardWidth,
        index * cardWidth,
        (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1, 0.8],
    });
    return (
        <TouchableOpacity
            disabled={activeCardIndex != index}
            activeOpacity={1}
            onPress={() => navigation.navigate('DescriptionScreen', hotel)}>
            <Animated.View style={{ ...styles.card, transform: [{ scale }], marginTop: 30 }}>
                <Animated.View style={{ ...styles.cardOverLay, opacity }} />
                <View style={styles.priceTag}>
                    <Text
                        style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>
                        ${hotel.price}
                    </Text>
                </View>
                <Image source={hotel.image} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                {hotel.name}
                            </Text>
                            <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                                {hotel.location}
                            </Text>
                        </View>
                        <Icon name="bookmark-border" size={26} color={COLORS.primary} />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="star" size={15} color={COLORS.orange} />
                            <Icon name="star" size={15} color={COLORS.orange} />
                            <Icon name="star" size={15} color={COLORS.orange} />
                            <Icon name="star" size={15} color={COLORS.orange} />
                            <Icon name="star" size={15} color={COLORS.grey} />
                        </View>
                        <Text style={{ fontSize: 10, color: COLORS.grey }}>365reviews</Text>
                    </View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};
import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { styles } from '../../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseVitaminsStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../../../constants/Colors';

export const CardChooseVitaminsComponent = ({ pet }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}>
            {/* // onPress={() => navigation.navigate('DetailsScreen', pet)}> */}
            <View style={styles.cardContainer}>
                {/* Render the card image */}
                <View style={styles.cardImageContainer}>
                    <Image
                        source={pet.image}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </View>

                {/* Render all the card details here */}
                <View style={styles.cardDetailsContainer}>
                    {/* Name and gender icon */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            style={{ fontWeight: 'bold', color: COLORS.dark, fontSize: 20 }}>
                            {pet?.name}
                        </Text>
                        <Icon name="gender-male" size={22} color={COLORS.grey} />
                    </View>

                    {/* Render the age and type */}
                    <Text style={{ fontSize: 12, marginTop: 5, color: COLORS.dark }}>
                        {pet?.type}
                    </Text>
                    <Text style={{ fontSize: 10, marginTop: 5, color: COLORS.grey }}>
                        {pet?.age}
                    </Text>

                    {/* Render distance and the icon */}
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Icon name="map-marker" color={COLORS.primary} size={18} />
                        <Text style={{ fontSize: 12, color: COLORS.grey, marginLeft: 5 }}>
                            Distance:7.8km
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

}
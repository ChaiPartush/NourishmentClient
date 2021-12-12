import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { styles } from '../../../../Styles/QuestionsToUserStyles/BmiComponentsStyle/ChooseGenderStyle'
import * as Animatable from 'react-native-animatable'

export const GenderCard = ({ iconName, title, onpress, value }) => {
    return (
        <TouchableOpacity style={[styles.card, {
            backgroundColor: (value === title) ? '#F2EDD7' : '#F2EDD7',
            borderColor: (value === title) ? '#F6D7A7' : '#F6EABE',
            borderWidth: (value === title) ? 6 : 0,
        }]}
            onPress={() => onpress(title)}>
            <Animatable.View style={styles.cardContainer}>
                <Fontisto name={iconName} color='#4B6587' size={80.0} />
                <Text style={styles.text}>{title}</Text>
            </Animatable.View>
        </TouchableOpacity>
    )



}
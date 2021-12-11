import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");
const viewHeight = height - 20;
import Fontisto from 'react-native-vector-icons/Fontisto';
import { bmiCardStyle } from '../../../../Styles/QuestionsToUserStyles/BmiCardStyle'
import * as Animatable from 'react-native-animatable'

export const GenderCard = ({ iconName, title, onpress, value }) => {
    const insiderViewHeight = viewHeight / 5;
    return (

        <TouchableOpacity style={[bmiCardStyle.card, {
            backgroundColor: (value === title) ? '#F2EDD7' : '#F2EDD7',
            borderColor: (value === title) ? '#F6D7A7' : '#F6EABE',
            borderWidth: (value === title) ? 6 : 0,
            elevation: 12

        }]}

            onPress={() => onpress(title)}>
            <Animatable.View style={{
                justifyContent: 'center',
                alignItems: 'center', margin: (10 * insiderViewHeight) / 100
            }}>

                <Fontisto
                    name={iconName}
                    color='#4B6587'
                    size={80.0}
                />
                <Text style={{ fontSize: 18, color: '#8D8E98', fontWeight: 'bold', marginTop: 20 }}
                >{title}</Text>
            </Animatable.View>


        </TouchableOpacity>
    )



}
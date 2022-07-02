import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../../../../Styles/QuestionsToUserStyles/BmiComponentsStyle/ChooseGenderStyle'
import * as Animatable from 'react-native-animatable'
import { width, height } from '../../../../constants/ScreenDimentionConst';
import { Colors } from '../../../../colors';

export const GenderCard = ({ iconName, title, onpress, value }) => {
    return (
        <TouchableOpacity style={{

            backgroundColor: '#d6ced8',

            borderColor: (value === title) ? Colors.lightBlue : '#F6D7A7',
            borderWidth: (value === title) ? 4 : 0,
            width: width * 0.4,
            height: height * 0.2,
            borderRadius: 100,
            margin: 13
        }}
            onPress={() => onpress(title)}>
            <Animatable.View style={{
                justifyContent: 'center',
                alignItems: 'center',

                margin: (4 * height) / 100
            }}>

                <Fontisto name={iconName} color='#4B6587' size={80.0} />
                <Text style={{
                    fontFamily: "Fredoka-Regular",
                    fontSize: 18,
                    fontSize: height * 0.021,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#8D8E98',
                    marginTop: 20
                }}>{title}</Text>
            </Animatable.View>
        </TouchableOpacity>
    )



}
import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { COLORS } from '../../constants/Colors'
import { SIZES } from '../../constants/Sizes'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Collapsible from 'react-native-collapsible';
import { width, height } from '../../constants/ScreenDimentionConst'


export const WorkoutTypeCard = ({ name }) => {
    const [collapsed, setCollapsed] = useState(true)
    return (

        <View style={{ backgroundColor: COLORS.light, borderRadius:10,borderWidth:1, flexDirection: 'column', margin: width * 0.01 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-around'}}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{  color: '#35858B', fontWeight: 'bold' }}>
                        {name}
                    </Text>
                </View>


                <Image
                    source={require('../../assets/images/Food/CHICKEN.png')}
                    resizeMode='contain'
                    style={{
                        width: width * 0.2,
                        height: 30,
                        

                    }}
                />



            </View>
        </View >

    )

}
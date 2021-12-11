
import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import COLORS from '../../constants/Colors'
const { width, height } = Dimensions.get("window")


const styles = StyleSheet.create({
    button1: {

        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 5,

    },
    button2: {

        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 5,
        right: 5,
    },
})



export const NextArrow = ({ navigateToPageFunc }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            {/* <View style={styles.button1}>
                <TouchableOpacity>
                    <View
                        style={{
                            height: 50,
                            width: 50,
                            elevation: 7,
                            marginRight: 30,
                            marginLeft: 20,
                            marginBottom: 6,
                            borderRadius: 30,
                            backgroundColor: COLORS.white,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Icon name="chevron-right" size={28} color={COLORS.primary} />
                    </View>
                </TouchableOpacity>
            </View> */}
            <View style={styles.button2}>
                <TouchableOpacity
                    onPress={navigateToPageFunc}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            height: 40,
                            width: 40,
                            elevation: 6,
                            marginRight: 18,
                            marginBottom:1,
                            borderRadius: 30,
                            backgroundColor: '#FF5678',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                      
                    >
                        <AntDesignIcons name="right" 
                            style={{ fontSize: 20, color: 'white' }} />
                        {/* <Icon name="chevron-right" size={35} color={'white'} /> */}
                    </View>
                </TouchableOpacity>
            </View>
        </View>


    )
}















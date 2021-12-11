import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { COLORS } from '../../../constants/Colors'
import DateTimePicker from '@react-native-community/datetimepicker';
import { width } from '../../../constants/ScreenDimentionConst'
import FontAwsome from 'react-native-vector-icons/FontAwesome';


export const SelectBirthday = () => {
    const scrollColor = '#D5EEFF'
    const [mode, setMode] = useState('date');
    const [text, setText] = useState('11/11/2011')
    const [date, setDate] = useState(new Date());
    const [showCalender, setShowCalender] = useState(false);

    const getDateText = (selectedDate) => {
        const createDateType = new Date(selectedDate);
        const getDay = createDateType.getDate();
        const getMonth = createDateType.getMonth() + 1;
        const getYear = createDateType.getFullYear();
        return getDay + '/' + getMonth + '/' + getYear
    }
    const onChange = (event, selectedDate) => {
        if (selectedDate != null) {
            setDate(selectedDate)
            setText(getDateText(selectedDate))
            setShowCalender(false)
        }
    };
    const createDatePicker = () => {
        return (
            < DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChange}
            />
        )
    }


    return (
        <Animatable.View style={{
            flexDirection: 'column',
            backgroundColor: scrollColor,
            width: (width * 47) / 100,
            marginLeft: (width * 2) / 100,
            borderRadius: 10,
            elevation: 12
        }}>
            <Text style={{ fontSize: 18, color: '#8D8E98', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>BIRTHDAY</Text>
            <Animatable.View style={{
                marginTop: 50,
            }}>

                <View>
                    <View>
                        <TouchableOpacity
                            style={{ color: '#05375A', width: (width * 47) / 100 }}
                            title="DatePicker"
                            onPress={() => setShowCalender(true)}
                        >

                            <View style={{ flexDirection: 'row' }}>
                                <FontAwsome
                                    name="calendar"
                                    color={COLORS.darkBlue}
                                    size={45}
                                    style={{ marginLeft: 10 }}
                                />
                                <Text style={{ color: '#8F4068', marginLeft: 20, marginTop: 12, alignItems: 'center', fontWeight: 'bold', fontSize: 20 }}>{text}</Text>

                            </View>

                        </TouchableOpacity>
                    </View>
                    {
                        (showCalender === true) ? createDatePicker() : null
                    }
                </View>
            </Animatable.View>
        </Animatable.View>
    )

}
import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { COLORS } from '../../../constants/Colors'
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../../Styles/QuestionsToUserStyles/BmiComponentsStyle/SelectBirthdayStyle';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import { width, height } from '../../../constants/ScreenDimentionConst';
import { MealsNumber } from '../../HomeScreen/MealsNumber';

const getDateText = (selectedDate) => {
    const createDateType = new Date(selectedDate);
    let day = '' + createDateType.getDate();
    let month = '' + (createDateType.getMonth() + 1);
    const year = createDateType.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return day + '/' + month + '/' + year
}
export const SelectBirthday = ({ birthday }) => {
    const now = getDateText(Date.now())
    const [text, setText] = useState(now)
    const [date, setDate] = useState(new Date());
    const [showCalender, setShowCalender] = useState(false);


    const getDateObject = (selectedDate) => {
        const createDateType = new Date(selectedDate);
        const getDay = createDateType.getDate();
        const getMonth = createDateType.getMonth() + 1;
        const getYear = createDateType.getFullYear();
        return {
            day: getDay,
            month: getMonth,
            year: getYear
        }
    }
    const onChange = (event, selectedDate) => {
        if (selectedDate != null) {
            setDate(selectedDate)
            setText(getDateText(selectedDate))
            setShowCalender(false)
            birthday(getDateObject(selectedDate))
        }
    };
    const createDatePicker = () => {
        return (
            < DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                display="default"
                onChange={onChange}
            />
        )
    }

    return (
        <Animatable.View style={{
            flexDirection: 'column',

            alignItems: 'center',
            backgroundColor: '#d6ced8',
            height: height * 0.17,
            width: width * 0.45,
            borderRadius: 40,


        }}>
            <Text style={{
                textAlign: 'center',
                fontSize: height * 0.021,
                color: '#8D8E98',
                fontWeight: 'bold',
                fontFamily: "Fredoka-Regular"

            }}>תאריך לידה</Text>

            <Animatable.View style={{ margin: height * 0.04 }}>

                <TouchableOpacity
                    title="DatePicker" onPress={() => setShowCalender(true)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwsome name="calendar" color={'#224854'} size={height * 0.05} style={{ margin:2,right:7 }} />
                        <Text style={{
                            // marginLeft: 20,
                            marginTop: 8,
                            alignItems: 'center',
                            fontFamily: "Fredoka-Regular",
                            fontSize: height * 0.024,
                            fontWeight: '300',
                            color: '#224854'
                        }}>{text}</Text>
                    </View>
                </TouchableOpacity>


                {showCalender === true && createDatePicker()}

                {/* {(showCalender === true) ? createDatePicker() : null} */}
            </Animatable.View>
        </Animatable.View>
    )

}
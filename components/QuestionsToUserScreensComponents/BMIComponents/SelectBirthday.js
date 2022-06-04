import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { COLORS } from '../../../constants/Colors'
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../../Styles/QuestionsToUserStyles/BmiComponentsStyle/SelectBirthdayStyle';
import FontAwsome from 'react-native-vector-icons/FontAwesome';

export const SelectBirthday = ({ birthday }) => {
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
                is24Hour={true}
                display="default"
                onChange={onChange}
            />
        )
    }

    return (
        <Animatable.View style={styles.container}>
            <Text style={styles.textTitle}>BIRTHDAY</Text>
            <Animatable.View style={{ marginTop: 50 }}>

                <TouchableOpacity style={styles.calendarButton} title="DatePicker" onPress={() => setShowCalender(true)}>
                    <View style={styles.iconContainer}>
                        <FontAwsome name="calendar" color={COLORS.darkBlue} size={45} style={styles.icon} />
                        <Text style={styles.birthdayText}>{text}</Text>
                    </View>
                </TouchableOpacity>

                {(showCalender === true) ? createDatePicker() : null}
            </Animatable.View>
        </Animatable.View>
    )

}
import React, { useState } from 'react'
import { View } from 'react-native'
import { GenderCard } from './GenderCard'
import { styles } from '../../../../Styles/QuestionsToUserStyles/BmiComponentsStyle/ChooseGenderStyle'
import { GenderType } from '../../../../constants/Logics/CalculateBmrConsts'
import { height } from '../../../../constants/ScreenDimentionConst'
export const RenderGenderTypes = ({ gender }) => {
    const [selected, setSelected] = useState(null);
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: height * 0.017,
            
        }}>

            <GenderCard
                iconName='male'
                title={'זכר'}
                onpress={(value) => {
                    setSelected(value)
                    gender(value)

                }}
                value={selected}
            />

            <GenderCard
                iconName='female'
                title={'נקבה'}
                onpress={(value) => {
                    setSelected(value)
                    gender(value)
                }}
                value={selected}
            />

        </View>
    )

}
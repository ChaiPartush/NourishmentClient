import React, { useState } from 'react'
import { View } from 'react-native'
import { GenderCard } from './GenderCard'
import { styles } from '../../../../Styles/QuestionsToUserStyles/BmiComponentsStyle/ChooseGenderStyle'
import { GenderType } from '../../../../constants/Logics/CalculateBmrConsts'
export const RenderGenderTypes = ({ gender }) => {
    const [selected, setSelected] = useState(null);
    return (
        <View style={styles.rowCardsContainer}>

            <GenderCard
                iconName='male'
                title={GenderType.male}
                onpress={(value) => {
                    setSelected(value)
                    gender(value)

                }}
                value={selected}
            />

            <GenderCard
                iconName='female'
                title={GenderType.female}
                onpress={(value) => {
                    setSelected(value)
                    gender(value)
                }}
                value={selected}
            />

        </View>
    )

}
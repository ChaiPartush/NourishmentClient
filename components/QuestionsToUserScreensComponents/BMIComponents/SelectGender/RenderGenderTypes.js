import React, { useState } from 'react'
import { View } from 'react-native'
import { GenderCard } from './GenderCard'

export const RenderGenderTypes = () => {
    const [selected, setSelected] = useState(null);
    return (
        <View style={{ flexDirection: 'row' }}>


            <GenderCard
                iconName='male'
                title="MALE"
                onpress={(value) => setSelected(value)}
                value={selected}
            />


            <GenderCard
                iconName='female'
                title='FEMALE'
                onpress={(value) => setSelected(value)}
                value={selected}
            />

        </View>
    )

}
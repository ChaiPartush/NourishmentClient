import React from 'react'
import { View } from 'react-native'
import { targets } from '../../../constants/Data/QuestionsToUser/ChooseTarget/targets'
import { width } from '../../../constants/ScreenDimentionConst'

export const Pagination = ({ currentIndex }) => {

    return (
        <View style={{ width: width, flexDirection: 'row', justifyContent: 'center' }}>
            {targets.map((_, index) => (
                <View key={index} style={{
                    borderRadius: 12,
                    width: (currentIndex === index) ? 20 : 12,
                    height: (currentIndex === index) ? 20 : 12,
                    marginBottom: 30,
                    marginTop: (currentIndex === index) ? -2 : 2,
                    marginRight: 30,
                    backgroundColor: (currentIndex === index) ? '#FF5678' : "#FF5678" + 20

                }} />

            ))}
        </View>
    )

}
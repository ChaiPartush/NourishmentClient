import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Pagination } from './Pagination'
import { ScrollTargets } from './ScrollTargets'

export const RenderTargetsAndPagination = ({target}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            {/* <ScrollView style={{ backgroundColor: 'white' }}> */}
                <View>
                    <View style={{ height: '100%' }}>
                        <ScrollTargets onpress={(value) => target(value)} />
                    </View>

                </View>
            {/* </ScrollView> */}
            <View style={{ alignItems: 'center', marginTop: 30, height: '3%' }}>
                <Pagination currentIndex={currentIndex} />
            </View>

        </View>
    )
}


import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Pagination } from './Pagination'
import { ScrollTargets } from './ScrollTargets'

export const RenderTargetsAndPagination = ({target}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
                <View>
                    <View style={{ height: '100%' }}>
                        <ScrollTargets onpress={(value) => target(value)} />
                    </View>

                </View>
        </View>
    )
}


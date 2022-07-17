import React from 'react';
import { View, Text } from 'react-native'
import Swiper from 'react-native-swiper';

export const SwiperComponent = ({ currentPage, changePage }) => {
    const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4'];
    let p = 0

    const renderViewPagerPage = (data) => {

        return (
            <View key={data} style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text>{data}</Text>
            </View>
        );
    };

    return (
        <Swiper
            style={{ flexGrow: 1 }}
            showsPagination={false}
            index={currentPage}
            loop={false}
            showsButtons={false}
            onIndexChanged={(l) => p = l}
            


        >
            {PAGES.map((page) => {
                return (
                    renderViewPagerPage(page)
                )
            }
            )}
        </Swiper>
    )


}
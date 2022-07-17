import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,Text,View,SectionList,SafeAreaView,Image,FlatList,} from 'react-native';
import { width } from '../../constants/ScreenDimentionConst';

const ListItem = ({ item }) => {
    return (
        <View style={styles.item}>
            <Image
                source={{
                    uri: item.uri,
                }}
                style={styles.itemPhoto}
                resizeMode="cover"
            />
            <Text style={styles.itemText}>{item.text}</Text>
        </View>
    );
};

const renderChooseFoodComponents = () => {

    return (
        <View>

            < FlatList
                columnWrapperStyle={{
                    height: height * 0.3,
                    width: width * 0.8,
                    left: width * 0.15,
                    top: height * 0.01,



                }}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                // onScroll={(event) => {

                // }}

                // onScrollBeginDrag={(e) => setIsScroll(true)}
                data={parentItems()}
                ListEmptyComponent={EmptyListMessage}
                renderItem={renderItem}
                keyExtractor={item => item.name}

            // renderItem={({ item }) => {


            //     return (
            //         <View

            //             style={{ flex: 1 }}
            //         >

            //             <Animatable.View
            //                 animation={'bounceInRight'} duration={1000}

            //                 style={{ marginTop: height * 0.02 }}>


            //                 < CardChooseFood
            //                     plant={item}
            //                     favoriteProducts={(value) => {

            //                         if (value["type"] === true) {
            //                             const name = value["name"]
            //                             let newArr = []
            //                             newArr = favorite.slice()
            //                             newArr.push(name)
            //                             setFavorite(newArr)

            //                         } else if (value["type"] === false) {
            //                             const name = value["name"]
            //                             let newArr = []
            //                             newArr = favorite.slice()
            //                             const itemIndex = newArr.indexOf(name)
            //                             newArr.splice(itemIndex, 1)
            //                             setFavorite(newArr)
            //                         }
            //                     }}
            //                     isFavorite={favorite.includes(item["name"])}
            //                 />

            //             </Animatable.View>

            //         </View>
            //     )
            // }


            //   }

            />
        </View>

    )
}

const parentItems = () => {
    switch (currentPage) {
        case 0: {
            return carbohydratesItems
        }
        case 1: {
            return protainsItems
        }
        case 2: {
            return fatsItems
        }
        case 3: {
            return vitaminsItems
        }
    }
}

const renderItem = ({ item }) => {
    return (
        <View

            style={{ flex: 1 }}
        >


            <Animatable.View
                animation={'bounceInRight'} duration={1000}

                style={{ marginTop: height * 0.02 }}>



                < CardChooseFood

                    plant={item}
                    favoriteProducts={(value) => {

                        if (value["type"] === true) {
                            const name = value["name"]
                            let newArr = []
                            newArr = favorite.slice()
                            newArr.push(name)
                            setFavorite(newArr)

                        } else if (value["type"] === false) {
                            const name = value["name"]
                            let newArr = []
                            newArr = favorite.slice()
                            const itemIndex = newArr.indexOf(name)
                            newArr.splice(itemIndex, 1)
                            setFavorite(newArr)
                        }
                    }}
                    isFavorite={favorite.includes(item["name"])}
                />


            </Animatable.View>


        </View>
    )
}

export const Stteper = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <SafeAreaView style={{ flex: 1 }}>
                <SectionList
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    stickySectionHeadersEnabled={false}
                    sections={SECTIONS}
                    renderSectionHeader={({ section }) => (
                        <>
                            {section.horizontal ? (
                                <FlatList
                                    horizontal
                                    data={section.data}
                                    renderItem={({ item }) => <ListItem item={item} />}
                                    showsHorizontalScrollIndicator={false}
                                />
                            ) : null}
                        </>
                    )}
                    renderItem={({ item, section }) => {
                        if (section.horizontal) {
                            return null;
                        }
                        return <ListItem item={item} />;
                    }}
                />
            </SafeAreaView>
        </View>
    );
};

const SECTIONS = [
    {
        title: 'Made for you',
        horizontal: true,
        data: [
            {
                key: '1',
                text: 'Item text 1',
                uri: 'https://picsum.photos/id/1/200',
            },
            {
                key: '2',
                text: 'Item text 2',
                uri: 'https://picsum.photos/id/10/200',
            },

            {
                key: '3',
                text: 'Item text 3',
                uri: 'https://picsum.photos/id/1002/200',
            },
            {
                key: '4',
                text: 'Item text 4',
                uri: 'https://picsum.photos/id/1006/200',
            },
            {
                key: '5',
                text: 'Item text 5',
                uri: 'https://picsum.photos/id/1008/200',
            },
        ],
     },
    // {
    //     title: 'Punk and hardcore',
    //     data: [
    //         {
    //             key: '1',
    //             text: 'Item text 1',
    //             uri: 'https://picsum.photos/id/1011/200',
    //         },
    //         {
    //             key: '2',
    //             text: 'Item text 2',
    //             uri: 'https://picsum.photos/id/1012/200',
    //         },

    //         {
    //             key: '3',
    //             text: 'Item text 3',
    //             uri: 'https://picsum.photos/id/1013/200',
    //         },
    //         {
    //             key: '4',
    //             text: 'Item text 4',
    //             uri: 'https://picsum.photos/id/1015/200',
    //         },
    //         {
    //             key: '5',
    //             text: 'Item text 5',
    //             uri: 'https://picsum.photos/id/1016/200',
    //         },
    //     ],
    // },
    // {
    //     title: 'Based on your recent listening',
    //     data: [
    //         {
    //             key: '1',
    //             text: 'Item text 1',
    //             uri: 'https://picsum.photos/id/1020/200',
    //         },
    //         {
    //             key: '2',
    //             text: 'Item text 2',
    //             uri: 'https://picsum.photos/id/1024/200',
    //         },

    //         {
    //             key: '3',
    //             text: 'Item text 3',
    //             uri: 'https://picsum.photos/id/1027/200',
    //         },
    //         {
    //             key: '4',
    //             text: 'Item text 4',
    //             uri: 'https://picsum.photos/id/1035/200',
    //         },
    //         {
    //             key: '5',
    //             text: 'Item text 5',
    //             uri: 'https://picsum.photos/id/1038/200',
    //         },
    //     ],
    // },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#121212',
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        color: '#f4f4f4',
        marginTop: 20,
        marginBottom: 5,
    },
    item: {
        width:width
    },
    itemPhoto: {
        width: 200,
        height: 200,
    },
    itemText: {
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 5,
    },
});
import React, { useState } from 'react'
import { Dimensions, StatusBar, ScrollView, SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
// import Icon, { Icons } from '../components/Icons';
import { width, height } from '../../../constants/ScreenDimentionConst'
import { EnterAnimations } from '../../../constants/Animations/EnterAnimations'
import { ExitAnimations } from '../../../constants/Animations/ExitAnimations'
import { StepperInput } from '../../../components/HomeScreen/StepperInput'
import SwitchSelector from 'react-native-switch-selector';

const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
];

const colorAr = [
    '#637aff',
    '#60c5a8',
    '#CCCCCC',
    '#ff5454',
    '#039a83',
    '#dcb834',
    '#8f06e4',
    'skyblue',
    '#ff4c98',
]
const bgColor = (i) => colorAr[i % colorAr.length];

const ListItem = ({ item, index, animation }) => {
    return (
        <Animatable.View
            animation={animation}
            duration={1000}
            delay={index * 300}
        >
            <TouchableOpacity style={styles.listItem}>
                <View style={[styles.image, { backgroundColor: bgColor(index) }]} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>Lorem ipsum</Text>
                    {/* <Icon type={Icons.Feather} name="more-vertical" size={20} /> */}
                </View>
            </TouchableOpacity>
        </Animatable.View>
    )
}

export const HomeScreen = ({ route, navigation }) => {
    const [mealsNumber, SetMealsNumber] = useState(1)
    const [gender, SetGender] = useState("male")
    const renderItem = ({ item, index }) => {
        return (
            <ListItem item={item} index={index} animation={EnterAnimations.fadeIn} />
        )
    }

    const ListEmptyComponent = () => {
        const anim = {
            0: { translateY: 0 },
            0.5: { translateY: 50 },
            1: { translateY: 0 },
        }
        return (
            <View style={[styles.listEmpty]}>
                <Animatable.Text
                    animation={anim}
                    easing="ease-in-out"
                    duration={3000}
                    style={{ fontSize: 24 }}
                    iterationCount="infinite">
                    Empty List!
                </Animatable.Text>
            </View>
        )
    }

    const RenderSearchBar = () => {
        return (
            <View style={{ height: 60, width: '100%', backgroundColor: 'white', borderRadius: 10, position: 'absolute', top: 125, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', elevation: 12, }}>
                {/* <MaterialIcons name='search' size={28} /> */}
                {/* <TextInput placeholder="Search place" /> */}
            </View>
        )
    }
    const RenderTitlePage = () => {
        return (
            <View>
                <StepperInput
                    value={mealsNumber}
                    onAdd={() => {
                        if (mealsNumber < 12) {
                            SetMealsNumber(mealsNumber + 1)
                        }
                    }

                    }
                    onMinus={() => {
                        if (mealsNumber > 1) {
                            SetMealsNumber(mealsNumber - 1)
                        }
                    }}
                />


                {/* <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23, marginTop: 20 }}>What is your</Text>
                 <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23 }}>Health Problem?</Text> */}
            </View >
        )
    }
    return (
        <SafeAreaView style={{ height: "100%", backgroundColor: "#044244" }}>
            <StatusBar translucent={false} />
            <View style={{ width: '100%', paddingTop: 40, alignItems: "center" }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: "#FFF",
                    paddingVertical: 25,

                }}>Find Awsome photos</Text>
            </View>

            <View style={{ flexDirection: 'column', flex: 1, }}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 20, height: height * 0.1, alignItems: 'center', justifyContent: 'space-between' }}>
                    {RenderTitlePage()}
                    <SwitchSelector
                        options={genderOptions}
                        initial={0}
                        style={{ width: width * 0.4 }}
                        onPress={value => SetGender(value)}
                    />
                </View>
                <View style={{
                    backgroundColor: "#FFF",
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    height: 1000,
                    paddingHorizontal: 35
                }}>

                </View>

                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FlatList
                        data={Array(mealsNumber).fill('')}
                        keyExtractor={(_, i) => String(i)}
                        numColumns={2}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={ListEmptyComponent}
                    />
                </View> */}

            </View>






        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    details: {
        margin: 8,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(0, 0, 0, .08)',
    },
    listEmpty: {
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
    },

    listItem: {
        height: 200,
        width: width * 0.45,
        backgroundColor: 'white',
        margin: 8,
        borderRadius: 10,
        elevation: 12
    },
    image: {
        height: 150,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#f45'
    },
    detailsContainer: {
        paddingHorizontal: 16,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
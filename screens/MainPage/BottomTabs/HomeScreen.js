import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';

import { useTheme } from '@react-navigation/native';

export const HomeScreen = ({ navigation }) => {

    const { colors } = useTheme();

    const theme = useTheme();
    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor='#009387' barStyle={theme.dark ? "light-content" : "dark-content"} />
            <Text style={{ color: colors.text }}>Home Screen</Text>
            <Button
                title="Go to detail screen"
                onPress={() => navigation.navigate("DetailsScreen")}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
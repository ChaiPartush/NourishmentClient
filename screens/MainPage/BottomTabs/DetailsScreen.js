import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export const DetailsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* <Text>Detail Screen</Text> */}

            {/* <Button
                title="Go to detail screen...again"
                onPress={() => navigation.push("Details")}
            />

            <Button
                title="Go to home"
                onPress={() => navigation.navigate("Home")}
            />

            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />

            <Button
                title="Go to the first screen"
                onPress={() => navigation.popToTop()}
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
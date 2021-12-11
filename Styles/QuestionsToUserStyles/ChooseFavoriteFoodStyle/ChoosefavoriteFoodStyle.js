import { StyleSheet } from 'react-native';
const segmentWidth = 2;
const segmentsLength = 91;
const segmentSpacing = 20;
const snapSengment = segmentWidth + segmentSpacing;
const rulerWidth = (segmentsLength - 1) * snapSengment;


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container1: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    title1: {
        color: "white",
        fontFamily: "SFProText-Semibold",
        fontSize: 24,
        marginBottom: 31,
    },
    scrollViewContainerStyle: {
        justifyContent: 'flex-end'
    },
    stepIndicator: {
        marginVertical: 50,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepLabel: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#999999',
    },
    stepLabelSelected: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#4aae4f',
    },
    button1: {

        alignItems: "center",
        justifyContent: "center",

        bottom: 10,


    },
    segment: {
        width: segmentWidth
    },
    button2: {

        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 5,
        right: 5,
    },


    ruler: {
        width: rulerWidth,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },


});



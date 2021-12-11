import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get("screen");
const viewHeight = height - 20;
const viewWidth = width;

export const bmiCardStyle = StyleSheet.create({
  card: {
    width: viewWidth / 3,
    elevation:12,
    height: viewHeight / 5,
    marginRight: (1 * width) / 100,
    marginLeft: (1 * width) / 100,
    marginTop: (1 * height) / 100,
    marginBottom: (1 * height) / 100,
    borderRadius: 10,
    flex: 1
  },




});


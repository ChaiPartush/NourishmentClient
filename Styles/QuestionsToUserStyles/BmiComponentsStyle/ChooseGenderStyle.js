import { StyleSheet } from 'react-native';
import { width, height } from '../../../constants/ScreenDimentionConst'

export const styles = StyleSheet.create({

  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: (4 * height) / 100
  },

  card: {
    width: width / 3,
    elevation: 12,
    height: height / 5,
    marginRight: (1 * width) / 100,
    marginLeft: (1 * width) / 100,
    marginTop: (1 * height) / 100,
    marginBottom: (1 * height) / 100,
    borderRadius: 10,
    flex: 1,
    elevation: 12
  },

  text: {
    fontSize: 18,
    color: '#8D8E98',
    fontWeight: 'bold',
    marginTop: 20
  },

  rowCardsContainer: {
    flexDirection: 'row'
  }






});


import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Modal, Animated, Svg } from "react-native";
import { PieChartWithLines } from '../../../components/HomeScreen/PieChart/index'
import { ScrollView } from "react-native-gesture-handler";
import { MealCard } from '../../../components/HomeScreen/MealCard'
import { CardMeal } from "../../../components/HomeScreen/CardMeal";
import { MealsNumber } from '../../../components/HomeScreen/MealsNumber'
import { FONTS } from '../../../constants/Fonts'
import { SwichSelector } from '../../../components/HomeScreen/SwichSelector'
import { height, width } from "../../../constants/ScreenDimentionConst";
import { VictoryPie } from 'victory-native'
import { useTheme } from "react-navigation";
// import { PieChart } from "react-native-chart-kit";
import { COLORS } from "../../../constants/Colors";
import { WorkoutTypeCard } from '../../../components/HomeScreen/WorkoutTypeCard'
// import { PieChart } from "react-native-gifted-charts";
import { PieChart } from 'react-minimal-pie-chart';
import { PiecesContext } from "../../../components/Context/PiecesContext";
import { ThingsContext } from '../../../components/HomeScreen/thingsContext'
import { LogicIndex } from '../../../Logics/LogicIndex'
import { ConstantNodeDependencies, json } from "mathjs";


const meals = [...Array(12).keys()].map((i) => (i === 0 ? 1 : i + 1));
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const workouts = [
  {
    id: 1,
    color: "#BFEAF5",
    name: 'bodybuilding',
    image: 'sdfdZf',
    description: 'hello'
  },
  {
    id: 2,
    color: "#BFEAF5",
    name: 'tennis',
    image: 'sdfdZf',
    description: 'hello'
  },
  {
    id: 3,
    color: "#BFEAF5",
    name: 'dance',
    image: 'sdfdZf',
    description: 'hello'
  },
  {
    id: 4,
    color: "#BFEAF5",
    name: 'bodybuilding',
    image: 'sdfdZf',
    description: 'hello'
  },
  {
    id: 5,
    color: "#BFEAF5",
    name: 'tennis',
    image: 'sdfdZf',
    description: 'hello'
  },
  {
    id: 6,
    color: "#BFEAF5",
    name: 'dance',
    image: 'sdfdZf',
    description: 'hello'
  },
]


export const MenuScreen = ({ route }) => {
  // const target = route.params.chosenTarget;
  // const gender = route.params.chosenGender;
  // const height = route.params.chosenHeight;
  // const birthday = route.params.chosenBirthday;
  // const weight = route.params.chosenWeight;
  // const products = route.params.chosenProducts;


  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], { useNativeDriver: true })
  const newWidth = (width - 16 - 5) / 2;
  const [selected, setSelected] = useState(0);
  const [mealsNumber, setMealsNumber] = useState(4)
  const [value, setValue] = useState([])
  const [precentByIndex, setPrecentByIndex] = useState({});
  const [productObj, setProductObj] = useState({})

  const [pieces, setPiecs] = useState([{ x: 1, y: 25 },
  { x: 2, y: 25 },
  { x: 3, y: 25 },
  { x: 4, y: 25 }])
  let pieContext = React.useContext(PiecesContext);
  const colors = [
    "#BFEAF5",
    "#BEECC4",
    "#FFE4D9",
    "#FFDDDD",
    "#BFEAF5",
    "#BFEAF5",
    "#BEECC4",
    "#FFE4D9",
    "#FFDDDD",
    "#BFEAF5",
    "#FFDDDD",
    "#BFEAF5",
  ]



  const mealsArrayByMealsNumber = (mealsNumber) => {
    const mealsArray = []
    for (let index = 1; index <= mealsNumber; index++) {
      const element = {
        id: index,
        color: colors[index - 1]
      }
      mealsArray.push(element)

    }
    return mealsArray
  }

  const GetAge = (birthday) => {
    var d1 = birthday.day
    var m1 = birthday.month
    var y1 = birthday.year
    var date = new Date();
    var d2 = date.getDate();
    var m2 = 1 + date.getMonth();
    var y2 = date.getFullYear();
    var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (d1 > d2) {
      d2 = d2 + month[m2 - 1];
      m2 = m2 - 1;
    }
    if (m1 > m2) {
      m2 = m2 + 12;
      y2 = y2 - 1;
    }
    var d = d2 - d1;
    var m = m2 - m1;
    var y = y2 - y1;

    var totalAge = y + (m / 12)
    return totalAge

  }

  const MealsD = () => {
   // const age = GetAge(birthday)
    LogicIndex(168, 80.5, "Male", 39, "Balanced diet",
      ["rice",
        "qinoa",
        "beef",
        "breast",
        "almond",
        "avocado",
        "tomatto"])
  }










  return (

    <View style={{ flexDirection: 'column' }}>

      {MealsD()}







      {/* {() => <LogicIndex height={177} width={65} age={22} target={'Loss Weight'}
        namesOfLikesProductsArray={["rice", "breast", "avocado", "tomatto", "qinoa", "almond", "beef"]
        } />} */}
      {/* {console.log(LogicIndex(177, 65, 'male', 22, 'Loss Weight', ["rice", "breast", "avocado", "tomatto", "qinoa", "almond", "beef"]))} */}
      {/* <Text style={{ fontSize: 10, color: 'black' }}>
        {JSON.stringify(
          DivideFoodTypesValuesToProducts(
            ['tomatto', 'rice', 'qinoa'],
            { carbohydrate: 200, fats: 50, protains: 100 },
            { carbohydrate: {}, fat: {}, protain: {} },
            foodTypesCounterProducts,
            changeFoodTypesCounterProducts
          ))}
      </Text> */}
      <View style={{ flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-evenly', marginTop: 15 }}>
        <MealsNumber onPress={(value) => { setMealsNumber(value) }} />
        <SwichSelector />
      </View>

      <PieChartWithLines mealsNumber={mealsNumber} precentByValue={precentByIndex} piePieces={(value) => { setPiecs(value); }} />


      <View style={{ flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-evenly', marginTop: 15 }}>

        {/* <View style={{ borderRadius: 20, elevation: 20, backgroundColor: COLORS.light }}>

          <PieChart
            data={pieChartData}
            height={height * 0.15}
            width={width * 0.4}
            chartConfig={{ color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, }}
            accessor="population"
          />
        </View> */}

        {/* <View style={{ borderRadius: 20, elevation: 20, backgroundColor: COLORS.light, flexDirection: 'row', justifyContent: 'space-evenly', padding: 20 }}> */}
        {/* <View style={{ borderRadius: 20, elevation: 20, backgroundColor: COLORS.light, marginRight: 20, padding: 10 }} >
            <Text style={{ color: COLORS.gray, fontWeight: 'bold' }}>Time</Text>

          </View> */}
        {/* <View style={{ borderRadius: 20, elevation: 20, backgroundColor: COLORS.light, padding: 10, height: height * 0.2 }}>
            <Text style={{ color: COLORS.gray, fontWeight: 'bold' }}>Type of workout</Text>
            < FlatList
              data={workouts}
              renderItem={({ item, index }) => (
                // <WorkoutTypeCard name={item.name} />
                <Text style={{ color: COLORS.gray, fontWeight: 'bold' }}>{item.name}</Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />

          </View> */}


        {/* </View> */}

      </View>








      {/* < FlatList
        data={mealsArrayByMealsNumber(mealsNumber)}
        renderItem={({ item, index }) => (
          <CardMeal backgroundColor={item.color} index={index} mealsNumber={mealsNumber} piePieces={pieces} newPrecent={(value) => { setPrecentByIndex({ id: index, precent: value[0] }) }} />)}
        keyExtractor={(item, index) => index.toString()}
      /> */}

    </View >



  )
}
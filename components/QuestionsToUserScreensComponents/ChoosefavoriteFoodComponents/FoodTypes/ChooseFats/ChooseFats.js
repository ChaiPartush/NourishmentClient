import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { CategoryListFatsComponent } from './CategoryListFatsComponent'
import { CardChooseFatsComponent } from './CardChooseFatsComponent'
import * as Animatable from 'react-native-animatable'
import { COLORS } from '../../../../../constants/Colors'
import { GetNameAndImageByRangeInTableName, GetItemsToDisplay } from '../../../../../GetDataFromDB'
import { width, height } from '../../../../../constants/ScreenDimentionConst'
import { CardChooseFood } from '../CardChooseFood'

export const ChooseFats = ({ items }) => {
  let currentItems = items
  // const createDisplayProductObj = () => {
  //   let arr = []
  //   for (let index = 0; index < items.length; index++) {
  //     const itemName = items[index].name
  //     const itemImage = items[index].image
  //     const obj = { id: index + 1, name: itemName, img: itemImage }
  //     arr.push(obj)

  //   }
  //   // setDisplay(arr)
  //   return arr
  // }
  // const [items, setItems] = useState(async () => await GetItemsToDisplay().then((item) => { return (item) }))

  // const GetItemsToDisplay = () => {
  //   GetNameAndImageByRangeInTableName(1, 2, "\"foodType_fats\"").then((produts) => {
  //     setItems(produts)
  //   })






  const renderFatsCard = () => {
    return (

      < FlatList
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={currentItems}
        renderItem={({ item }) => {
          return <CardChooseFood plant={item} />;
        }}
      />
    )
  }













  return (
    <Animatable.View animation={'bounceInRight'} duration={1000}
      style={{ backgroundColor: COLORS.white, height: height * 0.83, marginTop: height * 0.02 }}>
      {/* <View style={style.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Welcome to</Text>
          <Text style={{ fontSize: 38, color: COLORS.green, fontWeight: 'bold' }}>
            Plant Shop
          </Text>
        </View> */}
      {/* <Icon name="shopping-cart" size={28} /> */}
      {/* </View> */}

      {/* <CategoryListFatsComponent /> */}

      {/* <View style={{ flexDirection: 'row' }}> */}
      {/* <View style={style.searchContainer}>
          <Icon name="search" size={25} color={COLORS.gray} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search Type Of Workout" style={style.input} />
        </View> */}
      {/* <View style={style.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View> */}
      {/* </View> */}

      {renderFatsCard()}


      {/* <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={plants}
        renderItem={({ item }) => {
          return <Card plant={item} />;
        }}
      /> */}
    </Animatable.View>




















    // <SafeAreaView style={{ flexDirection: 'column', top: height * 0.1, paddingHorizontal: 30 }}>
    // <View
    //   style={{ paddingHorizontal: 20, backgroundColor: COLORS.white, flexDirection: 'column',  }}>

    //   <View style={style.header}>
    //     {/* <View>
    //       <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Welcome to</Text>
    //       <Text style={{ fontSize: 38, color: COLORS.green, fontWeight: 'bold' }}>
    //         Plant Shop
    //       </Text>
    //     </View> */}
    //   </View>

    //   <View style={{ flexDirection: 'row' }}>
    //     <Icon name="search" size={25} style={{ marginLeft: 20 }} />
    //     <TextInput placeholder="Search" style={style.input} />
    //   </View>


    //   <View>
    //     <CategoryListFatsComponent />
    //   </View>

    //   <View>
    //     {renderFatsCard()}
    //   </View>

    // </View>
  );
};

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
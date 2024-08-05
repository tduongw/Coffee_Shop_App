import React, { useState } from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import HeaderBar from '../components/HeaderBar'
import CustomIcon from '../components/CustomIcon'
import CoffeeCard from '../components/CoffeeCard'

const getCategoriesFromData = (data: any) => {
  let temp:any ={}
  for (let i=0; i < data.length; i++){
    if(temp[data[i].name] == undefined){
      temp[data[i].name] = 1
  }else{
      temp[data[i].name]++
  }
}
let categories = Object.keys(temp)
categories.unshift('All')
return categories;
}

const getCoffeeList= (category: string, data: any)=>{
  if(category == "All"){
    return data
  }else{
    let coffeelist = data.filter((item: any) => item.name == category)
    return coffeelist
  }
}

const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList)
  const BeanList = useStore((state: any) => state.BeanList)
  const [categories, setCategories]= useState(
    getCategoriesFromData(CoffeeList)
  )

  const [searchText, setSearchText]= useState('')
  
  const [categoryIndex, setCategoryIndex] = useState({
    index: 1,
    category:categories[1],
  })
  
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList)
  )

  const tabBarHeight = useBottomTabBarHeight()

  //console.log('sortedCoffee= ', sortedCoffee.length)

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView 
      showsVerticalScrollIndicator = {false} 
      contentContainerStyle={styles.ScrollViewFlex}>
        {/*App Header */}
        <HeaderBar /> 

        <Text style={styles.ScreenTitle}>
          Fin the best{'\n'} coffee for you
        </Text>
        {/*Search input */}

        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => {}}>
            <CustomIcon 
              style={styles.InputIcon}
              name='search' size={FONTSIZE.size_18} 
              color={
                searchText.length > 0 
                ? COLORS.primaryOrangeHex: 
                COLORS.primaryLightGreyHex
                }
            />
          </TouchableOpacity>
          <TextInput 
            placeholder='Find Your Coffee...' 
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}/>
        </View>
        
        {/*Category Scroller */}

        <ScrollView 
          horizontal
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CotegoryScrollViewStyle}>
            {categories.map((data, index)=> (
              <View 
                key={index.toString()}
                style={styles.CategoryScrollViewContainer}>
                <TouchableOpacity 
                  style={styles.CategoryScrollViewItem} 
                  onPress={()=> {
                    setCategoryIndex({ index:index,category: categories[index] })
                    setSortedCoffee([
                      ...getCoffeeList(categories[index],CoffeeList)
                    ])
                  }}>
                  <Text 
                    style={[styles.CategoryText,
                      categoryIndex.index == index 
                      ? {color:COLORS.primaryOrangeHex,} : {},
                  ]}>
                    {data}
                  </Text>
                  {categoryIndex.index == index ? (
                  <View style={styles.ActiveCategory}/>) : (
                  <></>
                  )}
                </TouchableOpacity>
              </View>
            ))}

        </ScrollView>
        {/*Coffee FlatList */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator = {false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatlistContainer}
          keyExtractor={item => item.id}
          renderItem={({item})=>{
            return(
              <TouchableOpacity>
                <CoffeeCard 
                id={item.id}
                index={item.index}
                type={item.type}
                rosted={item.rosted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={() =>{}} />
              </TouchableOpacity>
            )
          }}
          />
        {/*Beans FlatList */}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  
  ScrollViewFlex:{
    flexGrow: 1,
  },

  ScreenTitle:{
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },

  InputContainerComponent:{
    flexDirection:'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems:'center',
  },

  InputIcon:{
    marginHorizontal: SPACING.space_20,

  },

  TextInputContainer:{
    flex:1,
    height: SPACING.space_20 *3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color:COLORS.primaryWhiteHex,
  },

  CotegoryScrollViewStyle:{
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },

  CategoryScrollViewContainer:{
    paddingHorizontal: SPACING.space_15,

  },

  CategoryScrollViewItem:{
    alignItems: 'center',
  },

  CategoryText:{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color:COLORS.primaryLightGreyHex,
  },

  ActiveCategory:{
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
    marginBottom: SPACING.space_4,
  },

  FlatlistContainer:{
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  }
})

export default HomeScreen
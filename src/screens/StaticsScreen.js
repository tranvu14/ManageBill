import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const confirmStatus = "C"
const pendingStatus = "P"

let categoriesData = [
  {
    id: 1,
    name: "Education",
    icon: "school",
    color: COLORS.yellow,
    expenses: [
      {
        id: 1,
        title: "Tuition Fee",
        description: "Tuition fee",
        location: "ByProgrammers' tuition center",
        total: 100.00,
        status: pendingStatus
      },
      {
        id: 2,
        title: "Arduino",
        description: "Hardward",
        location: "ByProgrammers' tuition center",
        total: 30.00,
        status: pendingStatus
      },
      {
        id: 3,
        title: "Javascript Books",
        description: "Javascript books",
        location: "ByProgrammers' Book Store",
        total: 20.00,
        status: confirmStatus
      },
      {
        id: 4,
        title: "PHP Books",
        description: "PHP books",
        location: "ByProgrammers' Book Store",
        total: 20.00,
        status: confirmStatus
      }
    ],
    summary: 50.00
  },
  {
    id: 2,
    name: "Nutrition",
    icon: 'fast-food',
    color: COLORS.lightBlue,
    expenses: [
      {
        id: 5,
        title: "Vitamins",
        description: "Vitamin",
        location: "ByProgrammers' Pharmacy",
        total: 25.00,
        status: pendingStatus,
      },

      {
        id: 6,
        title: "Protein powder",
        description: "Protein",
        location: "ByProgrammers' Pharmacy",
        total: 50.00,
        status: confirmStatus,
      },

    ],
    summary: 150.00

  },
  {
    id: 3,
    name: "Baby",
    icon: 'happy',
    color: COLORS.darkgreen,
    expenses: [
      {
        id: 7,
        title: "Toys",
        description: "toys",
        location: "ByProgrammers' Toy Store",
        total: 25.00,
        status: confirmStatus,
      },
      {
        id: 8,
        title: "Baby Car Seat",
        description: "Baby Car Seat",
        location: "ByProgrammers' Baby Care Store",
        total: 100.00,
        status: pendingStatus,
      },
      {
        id: 9,
        title: "Pampers",
        description: "Pampers",
        location: "ByProgrammers' Supermarket",
        total: 100.00,
        status: pendingStatus,
      },
      {
        id: 10,
        title: "Baby T-Shirt",
        description: "T-Shirt",
        location: "ByProgrammers' Fashion Store",
        total: 20.00,
        status: pendingStatus,
      },
    ],
    summary: 90.00

  },
  {
    id: 4,
    name: "Beauty & Care",
    icon: "sparkles",
    color: COLORS.peach,
    expenses: [
      {
        id: 11,
        title: "Skin Care product",
        description: "skin care",
        location: "ByProgrammers' Pharmacy",
        total: 10.00,
        status: pendingStatus,
      },
      {
        id: 12,
        title: "Lotion",
        description: "Lotion",
        location: "ByProgrammers' Pharmacy",
        total: 50.00,
        status: confirmStatus,
      },
      {
        id: 13,
        title: "Face Mask",
        description: "Face Mask",
        location: "ByProgrammers' Pharmacy",
        total: 50.00,
        status: pendingStatus,
      },
      {
        id: 14,
        title: "Sunscreen cream",
        description: "Sunscreen cream",
        location: "ByProgrammers' Pharmacy",
        total: 50.00,
        status: pendingStatus,
      },
    ],
    summary: 200.00

  },
  {
    id: 5,
    name: "Sports",
    icon: 'bicycle',
    color: COLORS.purple,
    expenses: [
      {
        id: 15,
        title: "Gym Membership",
        description: "Monthly Fee",
        location: "ByProgrammers' Gym",
        total: 45.00,
        status: pendingStatus,
      },
      {
        id: 16,
        title: "Gloves",
        description: "Gym Equipment",
        location: "ByProgrammers' Gym",
        total: 15.00,
        status: confirmStatus,
      },
    ],
    summary: 70.00

  },
  {
    id: 6,
    name: "Clothing",
    icon: 'shirt',
    color: COLORS.red,
    expenses: [
      {
        id: 17,
        title: "T-Shirt",
        description: "Plain Color T-Shirt",
        location: "ByProgrammers' Mall",
        total: 20.00,
        status: pendingStatus,
      },
      {
        id: 18,
        title: "Jeans",
        description: "Blue Jeans",
        location: "ByProgrammers' Mall",
        total: 50.00,
        status: confirmStatus,
      },
    ],
    summary: 20.00

  }
]

const StaticsScreen = () => {




  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setCategories(categoriesData);
  }, [])



  function renderCategoryList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        //  onPress={() => setSelectedCategory(item)}
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 5,
          paddingVertical: SIZES.radius,
          paddingHorizontal: SIZES.padding / 2,
          borderRadius: 5,
          backgroundColor: COLORS.white,

        }}
      >
        <Icon
          name={item.icon}
          color={item.color}
          size={30}
        />
        <View>
          <Text style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h3 }}>{item.name}</Text>
          <Text style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h2, fontWeight: 'bold' }}>{item.summary}</Text>
        </View>

      </TouchableOpacity>
    )

    return (
      <View style={{ paddingHorizontal: SIZES.padding - 5 }}>

        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          numColumns={2}
        />

      </View>
    )
  }
  return (
    <View>
      {renderCategoryList()}
    </View>
  )
}

export default StaticsScreen
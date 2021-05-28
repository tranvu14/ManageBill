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
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';


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
      },
      {
        id: 2,
        title: "Arduino",
        description: "Hardward",
        location: "ByProgrammers' tuition center",
        total: 30.00,
      },
      {
        id: 3,
        title: "Javascript Books",
        description: "Javascript books",
        location: "ByProgrammers' Book Store",
        total: 20.00,
      },
      {
        id: 4,
        title: "PHP Books",
        description: "PHP books",
        location: "ByProgrammers' Book Store",
        total: 20.00,
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
      },

      {
        id: 6,
        title: "Protein powder",
        description: "Protein",
        location: "ByProgrammers' Pharmacy",
        total: 50.00,
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
      },
      {
        id: 8,
        title: "Baby Car Seat",
        description: "Baby Car Seat",
        location: "ByProgrammers' Baby Care Store",
        total: 100.00,
      },
      {
        id: 9,
        title: "Pampers",
        description: "Pampers",
        location: "ByProgrammers' Supermarket",
        total: 100.00,
      },
      {
        id: 10,
        title: "Baby T-Shirt",
        description: "T-Shirt",
        location: "ByProgrammers' Fashion Store",
        total: 20.00,
      },
    ],
    summary: 100.00

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
      },
      {
        id: 12,
        title: "Lotion",
        description: "Lotion",
        location: "ByProgrammers' Pharmacy",
        total: 50.00,
      },
      {
        id: 13,
        title: "Face Mask",
        description: "Face Mask",
        location: "ByProgrammers' Pharmacy",
        total: 50.00,
      },
      {
        id: 14,
        title: "Sunscreen cream",
        description: "Sunscreen cream",
        location: "ByProgrammers' Pharmacy",
        total: 50.00,
      },
    ],
    summary: 90.00
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
      },
      {
        id: 16,
        title: "Gloves",
        description: "Gym Equipment",
        location: "ByProgrammers' Gym",
        total: 15.00,
      },
    ],
    summary: 60.00

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
      },
      {
        id: 18,
        title: "Jeans",
        description: "Blue Jeans",
        location: "ByProgrammers' Mall",
        total: 50.00,
      },
    ],
    summary: 50.00
  }
]

let categoriesDay = [
  {
    id: 1,
    create_at: '25-05-2021',
    list_item: [
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
          },
          {
            id: 2,
            title: "Arduino",
            description: "Hardward",
            location: "ByProgrammers' tuition center",
            total: 30.00,
          },
          {
            id: 3,
            title: "Javascript Books",
            description: "Javascript books",
            location: "ByProgrammers' Book Store",
            total: 20.00,
          },
          {
            id: 4,
            title: "PHP Books",
            description: "PHP books",
            location: "ByProgrammers' Book Store",
            total: 20.00,
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
          },

          {
            id: 6,
            title: "Protein powder",
            description: "Protein",
            location: "ByProgrammers' Pharmacy",
            total: 50.00,
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
          },
          {
            id: 8,
            title: "Baby Car Seat",
            description: "Baby Car Seat",
            location: "ByProgrammers' Baby Care Store",
            total: 100.00,
          },
          {
            id: 9,
            title: "Pampers",
            description: "Pampers",
            location: "ByProgrammers' Supermarket",
            total: 100.00,
          },
          {
            id: 10,
            title: "Baby T-Shirt",
            description: "T-Shirt",
            location: "ByProgrammers' Fashion Store",
            total: 20.00,
          },
        ],
        summary: 100.00

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
          },
          {
            id: 12,
            title: "Lotion",
            description: "Lotion",
            location: "ByProgrammers' Pharmacy",
            total: 50.00,
          },
          {
            id: 13,
            title: "Face Mask",
            description: "Face Mask",
            location: "ByProgrammers' Pharmacy",
            total: 50.00,
          },
          {
            id: 14,
            title: "Sunscreen cream",
            description: "Sunscreen cream",
            location: "ByProgrammers' Pharmacy",
            total: 50.00,
          },
        ],
        summary: 90.00
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
          },
          {
            id: 16,
            title: "Gloves",
            description: "Gym Equipment",
            location: "ByProgrammers' Gym",
            total: 15.00,
          },
        ],
        summary: 60.00

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
          },
          {
            id: 18,
            title: "Jeans",
            description: "Blue Jeans",
            location: "ByProgrammers' Mall",
            total: 50.00,
          },
        ],
        summary: 50.00
      }
    ],
    total_expense: 1000
  },
  {
    id: 2,
    create_at: '22-05-2021',
    list_item: [
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
          },
          {
            id: 2,
            title: "Arduino",
            description: "Hardward",
            location: "ByProgrammers' tuition center",
            total: 30.00,
          },
          {
            id: 3,
            title: "Javascript Books",
            description: "Javascript books",
            location: "ByProgrammers' Book Store",
            total: 20.00,
          },
          {
            id: 4,
            title: "PHP Books",
            description: "PHP books",
            location: "ByProgrammers' Book Store",
            total: 20.00,
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
          },

          {
            id: 6,
            title: "Protein powder",
            description: "Protein",
            location: "ByProgrammers' Pharmacy",
            total: 50.00,
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
          },
          {
            id: 8,
            title: "Baby Car Seat",
            description: "Baby Car Seat",
            location: "ByProgrammers' Baby Care Store",
            total: 100.00,
          },
          {
            id: 9,
            title: "Pampers",
            description: "Pampers",
            location: "ByProgrammers' Supermarket",
            total: 100.00,
          },
          {
            id: 10,
            title: "Baby T-Shirt",
            description: "T-Shirt",
            location: "ByProgrammers' Fashion Store",
            total: 20.00,
          },
        ],
        summary: 100.00

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
          },
          {
            id: 12,
            title: "Lotion",
            description: "Lotion",
            location: "ByProgrammers' Pharmacy",
            total: 50.00,
          },
          {
            id: 13,
            title: "Face Mask",
            description: "Face Mask",
            location: "ByProgrammers' Pharmacy",
            total: 50.00,
          },
          {
            id: 14,
            title: "Sunscreen cream",
            description: "Sunscreen cream",
            location: "ByProgrammers' Pharmacy",
            total: 50.00,
          },
        ],
        summary: 90.00
      },
    ],
    total_expense: 1000
  },
  {
    id: 3,
    create_at: '21-05-2021',
    list_item: [
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
          },
          {
            id: 2,
            title: "Arduino",
            description: "Hardward",
            location: "ByProgrammers' tuition center",
            total: 30.00,
          },
          {
            id: 3,
            title: "Javascript Books",
            description: "Javascript books",
            location: "ByProgrammers' Book Store",
            total: 20.00,
          },
          {
            id: 4,
            title: "PHP Books",
            description: "PHP books",
            location: "ByProgrammers' Book Store",
            total: 20.00,
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
          },

          {
            id: 6,
            title: "Protein powder",
            description: "Protein",
            location: "ByProgrammers' Pharmacy",
            total: 50.00,
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
          },
          {
            id: 8,
            title: "Baby Car Seat",
            description: "Baby Car Seat",
            location: "ByProgrammers' Baby Care Store",
            total: 100.00,
          },
          {
            id: 9,
            title: "Pampers",
            description: "Pampers",
            location: "ByProgrammers' Supermarket",
            total: 100.00,
          },
          {
            id: 10,
            title: "Baby T-Shirt",
            description: "T-Shirt",
            location: "ByProgrammers' Fashion Store",
            total: 20.00,
          },
        ],
        summary: 100.00

      }
    ],
    total_expense: 200
  }
]


const HistoryScreen = () => {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    setCategories(categoriesDay);
  }, [])




  function renderHeader() {
    return (
      <View style={{ paddingHorizontal: SIZES.padding, paddingVertical: SIZES.padding, backgroundColor: COLORS.white }}>
        <View>
          <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>Lịch sử chi tiêu</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: SIZES.padding, alignItems: 'center' }}>
          <View style={{
            backgroundColor: COLORS.lightGray,
            height: 50,
            width: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon name="calendar" size={20} />
            {/* <Image
              source={Icon}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.lightBlue
              }}
            /> */}
          </View>

          <View style={{ marginLeft: SIZES.padding }}>
            <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>11 Nov, 2020</Text>
            <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>18% more than last month</Text>
          </View>
        </View>
      </View>
    )
  }
  function renderHistoryList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        // onPress={() => setSelectedCategory(item)}
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 5,
          paddingVertical: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          borderRadius: 5,
          backgroundColor: COLORS.white,

        }}
      >
        <View
          style={{
            width: '100%'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                fontWeight: 'bold'
              }}
            >{item.create_at}</Text>
            <Text
              style={{
                ...FONTS.h2,
                fontWeight: "bold"
              }}
            >{item.total_expense}</Text>
          </View>
          {
            item.list_item?.map(val =>
              <View
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
                  name={val.icon}
                  color={val.color}
                  size={20}
                />
                <Text style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}>
                  {val.name}
                </Text>
                <Text
                  style={{
                    marginLeft: 'auto'
                  }}
                >
                  {val.summary}
                </Text>
              </View>
            )
          }
        </View>
      </TouchableOpacity>
    )
    return (
      <View style={{ paddingHorizontal: SIZES.padding - 5, flex: 1 }}>

        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}


      <View style={{
        flex: 1
      }}>

        {renderHistoryList()}
      </View>



    </View>
  )
}

export default HistoryScreen
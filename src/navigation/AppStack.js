import React, { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import StaticsScreen from '../screens/StaticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { TouchableOpacity, View } from 'react-native';
import AddPhotoScreen from '../screens/AddPhotoScreen';

const HomeStack = createStackNavigator();
//const DetailsStack = createStackNavigator();

const Tab = createBottomTabNavigator();


const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Trang chủ',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="AddPhoto"
      component={AddPhotoScreen}
      options={{
        tabBarButton: (props) =>
        (
          <TouchableOpacity
            style={{
              top: -30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // onPress={onPress}
            {...props}
          >
            <View
              style={{
                height: 70
              }}
            >
              <Icon name="add-circle" color='#d02860' size={54} />
            </View>

          </TouchableOpacity>
        )

        ,

      }}
    />


    <Tab.Screen
      name="History"
      component={HistoryScreen}
      options={{
        tabBarLabel: 'Lịch sử',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-timer" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

// const HomeStackScreen = ({ navigation }) => (
//   <HomeStack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor: '#009387',
//     },
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold'
//     }
//   }}>
//     <HomeStack.Screen name="Home" component={HomeScreen} options={{
//       title: 'Overview',
//       headerLeft: () => (
//         <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
//       )
//     }} />
//   </HomeStack.Navigator>
// );

// const DetailsStackScreen = ({ navigation }) => (
//   <DetailsStack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor: '#1f65ff',
//     },
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold'
//     }
//   }}>
//     <DetailsStack.Screen name="Details" component={HistoryScreen} options={{
//       headerLeft: () => (
//         <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
//       )
//     }} />
//   </DetailsStack.Navigator>
// );

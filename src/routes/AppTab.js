import React, { Component } from 'react';
import {
  Alert,
  Image,
  View,
  Text,
  AsyncStorage,
  Platform,
  TouchableOpacity
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import { Ticket } from '../scenes/Ticket';
import Logout from '../scenes/Sign/Logout';
import ScanResult from '../scenes/Ticket/ScanResult';
import vendorNav from '../scenes/Vendor';


const tabBarOptions = {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    showIcon: true,
    style: {
      backgroundColor: '#FFFFFF',
      paddingBottom: 5,
      height: 60
    },
    labelStyle: {
      color: '#8E7631'
    },
    tabBarIconStyle: {
      paddingTop: 5
    },
    inactiveBackgroundColor: 'rgba(79, 102, 149, 0.1)' // this option only work on ios
  }
}

const logoutTab = {
  screen: Logout     // Empty screen, useless in this specific case
  , navigationOptions: ({ navigation }) => ({
    title: 'Logout',
    tabBarOnPress: (scene, jumpToIndex) => {
      return Alert.alert(   // Shows up the alert without redirecting anywhere
        'Confirmation required'
        , 'Do you really want to logout?'
        , [
          { text: 'Cancel' },
          {
            text: 'Yes', onPress: () => {
              AsyncStorage.removeItem('SCANNER_DATA');
              AsyncStorage.removeItem('CURRENT_EVENT');
              AsyncStorage.removeItem('DATE_EVENT');
              AsyncStorage.removeItem('USER_ACCOUNT')
                .then(rs => {
                  navigation.dispatch({ type: 'Reset', routeName: 'Login' })
                })
            }
          }
        ]
      );
    },
  })
}

export const TicketNavigator = TabNavigator({
  Ticket: {
    screen: Ticket,
    navigationOptions: {
      title: 'TICKET SCANNER',
      tabBarLabel: 'TICKET',
      header: null
    }
  },
  Logout: logoutTab
}, tabBarOptions)

export const ReceiptNavigator = TabNavigator({
  Receipt: {
    screen: vendorNav,
    navigationOptions: {
      title: 'RECEIPT SCANNER',
      tabBarLabel: 'RECEIPT',
      header: null
    }
  },
  Logout: logoutTab
}, tabBarOptions)

export const AdminNavigator = TabNavigator({
  Ticket: {
    screen: Ticket,
    navigationOptions: {
      title: 'TICKET SCANNER',
      tabBarLabel: 'TICKET',
      header: null
    }
  },
  Receipt: {
    screen: vendorNav,
    navigationOptions: {
      title: 'RECEIPT SCANNER',
      tabBarLabel: 'RECEIPT',
      header: null
    }
  },
  Logout: logoutTab
}, tabBarOptions);
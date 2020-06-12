import React, { Component } from 'react';
import { StyleSheet, Text, Button, Image, View, LayoutAnimation } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Splash from './screens/splash'
import home from './screens/home'


const AppNavigator = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      headerShown: false,
    }
  },
  Home: {
    screen: home,
    navigationOptions: {
      headerLeft: () => null,
      gestureEnabled: false,
      title: "Sign In"
    }
  }

});


export default createAppContainer(AppNavigator)
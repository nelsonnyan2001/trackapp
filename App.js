import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Splash from './screens/splash'
import Authentication from './screens/authentication'
import home from './screens/home'

const AppNavigator = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      headerShown: false,
    }
  },
  Authentication: {
    screen: Authentication,
    navigationOptions: {
      headerShown: false,
    }
  },
  Home: {
    screen: home,
    navigationOptions:{
      headerLeft : () => {false},

    }

  }
});


export default createAppContainer(AppNavigator)
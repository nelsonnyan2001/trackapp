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
      headerShown: false,
      gestureEnabled: false,
    }
  }

});


export default createAppContainer(AppNavigator)
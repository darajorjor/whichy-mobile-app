import React from 'react'
import { Dimensions, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Home from 'src/screens/Home'
import Menu from 'src/screens/Menu'
import NewWhich from 'src/screens/NewWhich'
import AppHeader from 'src/common/AppHeader'
import { orange } from 'src/theme'

const { width } = Dimensions.get('window')

const MainNavigator = StackNavigator({
  Home,
  Menu: {
    screen: Menu,
    path: 'menu',
  },
  NewWhich,
}, {
  initialRouteName: 'Home',
  headerMode: 'float',
  headerTransitionPreset: 'uikit',
  navigationOptions: ({ navigation }) => ({
    headerBackTitle: null,
    headerBackImage: null,
    headerLeft: null,
    headerTransparent: true,
    headerStyle: {
      height: 60,
      width: Platform.select({
        ios: width + 35,
        android: width,
      }),
      right: Platform.select({
        ios: 20,
        android: 0,
      }),
      borderBottomWidth: 0,
      backgroundColor: orange,
      elevation: 0,
    },
    headerTitle: <AppHeader navigation={navigation} />,
  }),
})

export default MainNavigator

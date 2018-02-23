import React from 'react'
import { StackNavigator } from 'react-navigation'
import Home from 'src/screens/Home/Home'
import Menu from 'src/screens/Menu/Menu'
import AppHeader from 'src/common/AppHeader'
import { orange } from 'src/theme'

export default StackNavigator({
  Home: {
    screen: Home,
  },
  Menu: {
    screen: Menu,
  },
}, {
  initialRouteName: 'Home',
  navigationOptions: ({ navigation }) => ({
    headerBackTitle: null,
    headerBackImage: null,
    headerStyle: {
      height: 80,
      borderBottomWidth: 0,
      backgroundColor: orange,
    },
    headerTitle: <AppHeader navigation={navigation} />,
  }),
})
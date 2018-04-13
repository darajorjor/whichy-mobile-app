import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { setToStore } from 'src/redux/Main.reducer'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  }
})

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('./assets/1.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('./assets/2.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('./assets/3.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  }
]

@connect(
  null,
  { setToStore }
)
export default class Intro extends Component {
  static navigationOptions = {
    header: null,
  }

  handleDone = () => {
    const { setToStore, navigation: { replace } } = this.props

    replace('Home')
    setToStore('firstLogin', false)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          hidden
        />
        <AppIntroSlider
          doneLabel='اوکی'
          nextLabel='خب'
          slides={slides}
          onDone={this.handleDone}
        />
      </View>
    )
  }
}

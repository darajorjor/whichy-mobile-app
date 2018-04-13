import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { setToStore } from 'src/redux/Main.reducer'
import { connect } from 'react-redux'
import { translate } from 'src/utils/i18n'

global.__t = translate

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 160,
  }
})

const slides = [
  {
    key: 'fun',
    title: __t('intro.page1.title'),
    text: __t('intro.page1.text'),
    image: require('./assets/1.png'),
    imageStyle: styles.image,
    backgroundColor: '#e58c04',
  },
  {
    key: 'share',
    title: __t('intro.page2.title'),
    text: __t('intro.page2.text'),
    image: require('./assets/2.png'),
    imageStyle: styles.image,
    backgroundColor: '#5aa8d7',
  },
  {
    key: 'ask',
    title: __t('intro.page3.title'),
    text: __t('intro.page3.text'),
    image: require('./assets/3.png'),
    imageStyle: styles.image,
    backgroundColor: '#aa2656',
  },
  {
    key: 'beta',
    title: __t('intro.page4.title'),
    text: __t('intro.page4.text'),
    image: require('./assets/4.png'),
    imageStyle: styles.image,
    backgroundColor: '#6aa743',
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

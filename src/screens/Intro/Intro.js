import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { setToStore } from 'src/redux/Main.reducer'
import { connect } from 'react-redux'
import { translate } from 'src/utils/i18n'
import Jext from 'src/common/Jext'

global.__t = translate

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 160,
  },
  text: {
    fontFamily: 'IRANYekanFaNum',
    textAlign: 'center',
  },
})

const slides = [
  {
    key: 'fun',
    title: __t('intro.page1.title'),
    titleStyle: styles.text,
    textStyle: styles.text,
    text: __t('intro.page1.text'),
    image: require('./assets/1.png'),
    imageStyle: styles.image,
    backgroundColor: '#e58c04',
  },
  {
    key: 'share',
    title: __t('intro.page2.title'),
    titleStyle: styles.text,
    textStyle: styles.text,
    text: __t('intro.page2.text'),
    image: require('./assets/2.png'),
    imageStyle: styles.image,
    backgroundColor: '#5aa8d7',
  },
  {
    key: 'ask',
    title: __t('intro.page3.title'),
    titleStyle: styles.text,
    textStyle: styles.text,
    text: __t('intro.page3.text'),
    image: require('./assets/3.png'),
    imageStyle: styles.image,
    backgroundColor: '#aa2656',
  },
  {
    key: 'beta',
    title: __t('intro.page4.title'),
    titleStyle: styles.text,
    textStyle: styles.text,
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

  renderSkipButton = () => <Jext f={18} c='#fff'>{ __t('intro.skip') }</Jext>
  renderDoneButton = () => <Jext f={18} c='#fff'>{ __t('intro.done') }</Jext>
  renderNextButton = () => <Jext f={18} c='#fff'>{ __t('intro.next') }</Jext>
  renderPrevButton = () => <Jext f={14} c='#fff'>{ __t('intro.back') }</Jext>

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
          showSkipButton
          showPrevButton
          onDone={this.handleDone}
          onSkip={this.handleDone}
          renderSkipButton={this.renderSkipButton}
          renderPrevButton={this.renderPrevButton}
          renderNextButton={this.renderNextButton}
          renderDoneButton={this.renderDoneButton}
        />
      </View>
    )
  }
}

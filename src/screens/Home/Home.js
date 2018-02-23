import React, { PureComponent } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { orange } from 'src/theme'
import Jext from 'src/common/Jext'
import AppHeader from 'src/common/AppHeader'
import WatchVideoButton from './components/WatchVideoButton'
import Card from './components/Card'
import { white, black, gradients } from 'src/theme'
import Button from './components/Button'

export default class Home extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <AppHeader
        navigation={navigation}
        type="level"
        totalCoins={1230}
        level={{
          current: 3,
          currentQuestion: 2,
          totalQuestions: 20
        }}
      >
        <WatchVideoButton />
      </AppHeader>
    )
  })

  render() {
    return (
      <View style={styles.wrapper}>
        <Card
          backgroundColor={white}
          title={__t('home.imagine')}
          textColor={black}
          body='میتونستی برای همیشه زنده باشی'
        />
        <Card
          backgroundColor={black}
          title={__t('home.but')}
          textColor={white}
          body='دیگه نمیتونستی با کسی صحبت کنی'
        />

        <View style={styles.footer}>
          <Button
            title={__t('home.deny')}
            onPress={() => {}}
            gradientColors={gradients.red}
            style={{
              flex: 1,
            }}
          />

          <Button
            title={__t('home.accept')}
            onPress={() => {}}
            gradientColors={gradients.green}
            style={{
              flex: 1,
              marginLeft: 16,
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: orange,
    padding: 16,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
  },
})

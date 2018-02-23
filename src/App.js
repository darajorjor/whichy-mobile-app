import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'
import Navigator from './Navigator'
import { translate, isRTL } from 'src/utils/i18n'
import Ad from 'src/common/Ad'

const { width } = Dimensions.get('window')

// setLocale('fa')
global.__t = translate

const App = () => (
  <View style={styles.wrapper}>
    <Navigator />

    <Ad
      width={width}
      height={70}
    />
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

export default App

import React from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import config from './config'
import { translate } from 'src/utils/i18n'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Tapsell, { BannerAd, BANNER_320x50 } from 'react-native-tapsell'
import { black, darkOrange } from 'src/theme'
import codePush from 'react-native-code-push'
import toast from 'src/utils/toast'
import { Crashlytics } from 'react-native-fabric'

import { store, persistor } from './redux/store'
import { initVideoAd } from './redux/Main.reducer'
import Navigator from './Navigator'

const { width } = Dimensions.get('window')

global.persistor = persistor

// setLocale('fa')
global.__t = translate
global.toast = text => toast(text)
TouchableOpacity.defaultProps.activeOpacity = 0.8

Tapsell.setDebugMode(__DEV__)
Tapsell.initialize(config.tapsellKey)
store.dispatch(initVideoAd())

export default class App extends React.Component {
  componentDidMount() {
    try {
      codePush.sync()
    } catch (e) {
      Crashlytics.recordError(e)
      toast(e.message)
      throw e
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.wrapper}>
            <StatusBar
              backgroundColor={darkOrange}
              // translucent
            />
            <Navigator uriPrefix='whichy' />

            <View
              style={{
                width,
                alignItems: 'center',
                backgroundColor: black,
                paddingTop: 5,
              }}
            >
              <BannerAd
                zoneId={config.adZones.bottomBanner}
                bannerType={BANNER_320x50}
              />
            </View>
          </View>
        </PersistGate>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

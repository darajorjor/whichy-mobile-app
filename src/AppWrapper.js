import React from 'react'
import {
  TouchableOpacity,
} from 'react-native'
import config from './config'
import { translate } from 'src/utils/i18n'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Tapsell from 'react-native-tapsell'
import codePush from 'react-native-code-push'
import toast from 'src/utils/toast'
import { Crashlytics } from 'react-native-fabric'

import { store, persistor } from './redux/store'
import { initVideoAd } from './redux/Main.reducer'
import App from 'src/App'

global.persistor = persistor

// setLocale('fa')
global.__t = translate
global.toast = text => toast(text)
TouchableOpacity.defaultProps.activeOpacity = 0.8

Tapsell.setDebugMode(__DEV__)
Tapsell.initialize(config.tapsellKey)
store.dispatch(initVideoAd())

export default class AppWrapper extends React.Component {
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
          <App />
        </PersistGate>
      </Provider>
    )
  }
}
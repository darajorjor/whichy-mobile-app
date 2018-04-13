import React from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native'
import { BannerAd, BANNER_320x50 } from 'react-native-tapsell'
import { black, darkOrange } from 'src/theme'
import { connect } from 'react-redux'
import Navigator from './Navigator'
import config from './config'

const { width } = Dimensions.get('window')

@connect(
  state => ({
    firstLogin: state.Main.firstLogin,
  })
)
export default class App extends React.Component {
  render() {
    const { firstLogin } = this.props

    return (
      <View style={styles.wrapper}>
        <StatusBar
          backgroundColor={darkOrange}
          // translucent
        />

        <Navigator uriPrefix='whichy' />

        {
          !firstLogin &&
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
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

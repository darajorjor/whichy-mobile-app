import React, { PureComponent } from 'react'
import {
  View,
  Linking,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'
import config from 'src/config'
import _ from 'lodash'
import { orange, white, green, yellow } from 'src/theme'
import AppHeader from 'src/common/AppHeader'
import Qs from 'qs'
import storageConstants from 'src/constants/storage.constant'
import SafariView from 'react-native-safari-view'
import Jext from 'src/common/Jext'
import { connect } from 'react-redux'
import { setToStore } from 'src/redux/Main.reducer'
import Parallelogram from 'src/common/Parallelogram'
import DeviceInfo from 'react-native-device-info'
import codePush from 'react-native-code-push'
import cafeBazaar from 'src/utils/cafe-bazaar'

import ProfileButton from './components/ProfileButton'
import LoginModal from './components/LoginModal'
import Store from './components/Store'
import CoinsModal from './components/CoinsModal'
import BuyCoin from './components/BuyCoin'

const { width } = Dimensions.get('window')

@connect(
  null,
  { setToStore },
)
export default class Menu extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <AppHeader
        navigation={navigation}
        type="lang"
      >
        <BuyCoin onPress={_.get(navigation, 'state.params.onCoinsPress')} />
      </AppHeader>
    )
  })

  state = {
    modalVisible: false,
    coinsModalVisible: false,
  }

  componentDidMount() {
    const { navigation: { setParams } } = this.props

    Linking.addEventListener('url', this.handleOpenURL)
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url })
      }
    })

    setParams({
      onCoinsPress: () => this.setState({ coinsModalVisible: true })
    })

    codePush.getUpdateMetadata().then((metadata) => {
      if (!metadata) return null;
      this.setState({ label: metadata.label, version: metadata.appVersion, description: metadata.description });
    })
  }

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL)
  }

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/)
    const { setToStore } = this.props

    try {
      const { success, balance } = JSON.parse(decodeURI(user_string))

      if (!success) {
        return alert('something went wrong')
      }

      setToStore('balance', balance)
      if (Platform.OS === 'lios') {
        SafariView.dismiss()
        //
      } else {
        //
      }
    } catch (e) {
      console.error(e)
    }
  }

  handleLogin = () => this.handleOpenWebView(`${config.api}/users/login-google`)
  handlePurchaseItem = (coinCount) => {
    this.setState({ coinsModalVisible: false })

    if (Platform.OS === 'android' && config.isCafeBazaarBuild) {
      cafeBazaar.purchase(`coin-${coinCount}`)
    } else {
      AsyncStorage.getItem(storageConstants.SESSION)
        .then((session) => this.handleOpenWebView(`${config.api}/accounting/purchase-coin?${Qs.stringify({
          session,
          coinCount,
        })}`))
    }
  }

  handleOpenWebView = (url) => {
    if (Platform.OS === 'lios') {
      SafariView.isAvailable()
        .then(SafariView.show({
          url,
          fromBottom: true,
        }))
        .catch(error => {
          console.error(error)
        })
    } else {
      Linking.openURL(url)
    }
  }

  render() {
    const { navigation: { navigate } } = this.props

    return (
      <View style={{ flex: 1, backgroundColor: orange }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 19, paddingHorizontal: 20 }}>
          <Parallelogram
            onPress={() => navigate('NewWhich')}
            label={__t('menu.write_what_if')}
            labelStyle={{
              color: white,
              fontSize: 18,
            }}
            style={{
              backgroundColor: green,
              width: 130,
              padding: 5,
              height: 40,
            }}
          />
          <ProfileButton
            onPress={() => this.setState({ modalVisible: true })}
            disabled
          />
        </View>

        <View style={[styles.activeGameCard, styles.boxShadow]}>
          <Jext f={24} bold>{__t('menu.active_game')}</Jext>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: yellow }]}
            onPress={() => this.store.openGames()}
          >
            <Jext f={20} bold>استارتر</Jext>
          </TouchableOpacity>
        </View>

        <Store ref={ref => this.store = ref}>
          <Jext c='#ddd' style={{ marginTop: 16 }}>
            {DeviceInfo.getBuildNumber()}.
            {this.state.label ? this.state.label.replace('v', '') : '0'}.
            {this.state.version || '0'}.
            {this.state.description || '0'}
          </Jext>
        </Store>

        <LoginModal
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
          onGoogleLogin={this.handleLogin}
        />

        <CoinsModal
          visible={this.state.coinsModalVisible}
          onCoinPurchase={this.handlePurchaseItem}
          onRequestClose={() => this.setState({ coinsModalVisible: false })}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  activeGameCard: {
    marginTop: 10,
    width: width - 32,
    height: 120,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingTop: 5,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  boxShadow: {
    elevation: 2,
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowColor: 'rgba(66,66,66, 0.5)',
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  btn: {
    height: 55,
    alignSelf: 'stretch',
    marginTop: 10,
    backgroundColor: 'red',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

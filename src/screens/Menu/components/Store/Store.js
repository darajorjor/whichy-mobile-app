import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native'
import Jext from 'src/common/Jext'
import * as Animatable from 'react-native-animatable'
import { yellow, lightGreen, white, black } from 'src/theme'
import ColorfulItem from 'src/common/ColorfulItem'
import backIcon from './assets/back.png'

const { width, height } = Dimensions.get('window')

export default class Store extends PureComponent {
  state = {
    open: false,
  }

  handleButtonPress = (type) => () => {
    this.setState({ open: type })
  }

  openGames = () => {
    this.handleButtonPress('games')()
  }

  getTitle = () => {
    const { open } = this.state

    if (open) {
      if (open === 'games') {
        return __t('menu.games')
      } else {
        return __t('menu.other_colors')
      }
    }

    return __t('menu.store')
  }

  renderContent = () => {
    const { open } = this.state

    if (open === 'games') {
      return (
        <View style={{ alignSelf: 'stretch' }}>
          <ColorfulItem
            title={__t('store.basic')}
            titleStyle={{ color: black }}
            bought
            backgroundColor={yellow}
            onPress={() => {
            }}
          />
          <Jext style={{ alignSelf: 'center', marginTop: 16, }}>{__t('coming_soon')}</Jext>
        </View>
      )
    }

    if (open === 'colors') {
      return (
        <View style={{ alignSelf: 'stretch' }}>
          <Jext style={{ alignSelf: 'center', marginTop: 16, }}>{__t('coming_soon')}</Jext>
        </View>
      )
    }

    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: yellow }]}
          onPress={this.handleButtonPress('games')}
        >
          <Jext f={20} bold>{__t('menu.games')}</Jext>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: lightGreen }]}
          onPress={this.handleButtonPress('colors')}
        >
          <Jext f={20} c={white} bold>{__t('menu.other_colors')}</Jext>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { open } = this.state
    const { children } = this.props

    return (
      <Animatable.View
        transition='bottom'
        duration={800}
        easing='ease-out-expo'
        style={[
          styles.wrapper,
          styles.boxShadow,
          {
            bottom: open ? -140 : -height * 0.65,
          },
        ]}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => this.setState({ open: false })}>
          <Animatable.View
            transition='opacity'
            style={{ opacity: open ? 1 : 0 }}
          >
            <Image
              source={backIcon}
              style={styles.backButtonImage}
            />
          </Animatable.View>
        </TouchableOpacity>
        <Jext f={24} bold>{this.getTitle()}</Jext>
        {this.renderContent()}

        {open === 'colors' && children}
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: width - 32,
    height,
    position: 'absolute',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 10,
    padding: 16,
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
  boxShadow: {
    elevation: 2,
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowColor: 'rgba(66,66,66, 0.5)',
    shadowOffset: {
      height: 3,
      width: 0
    },
  },
  backButton: {
    position: 'absolute',
    end: 16,
    top: 16,
  },
  backButtonImage: {
    width: 34,
    height: 20,
  },
})

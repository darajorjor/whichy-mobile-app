import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'
import Jext from 'src/common/Jext'
import Pressable from 'src/common/Pressable'
import Parallelogram from 'src/common/Parallelogram'
import { green, red, white, darkenedGreen, darkenedRed } from 'src/theme'
import { isRTL } from 'src/utils/i18n'

const { width } = Dimensions.get('window')

export default class Rating extends PureComponent {
  state = {
    active: null,
  }

  handlePress = (callback, active) => () => {
    this.setState({
      active,
    })
    callback()
  }

  render() {
    const { onLike, onDislike } = this.props
    const { active } = this.state

    return (
      <View style={styles.coinsWrapper}>
        <View style={[styles.coinField, { flex: 1.3, flexDirection: isRTL ? 'row-reverse' : 'row', paddingStart: 13 }]}>
          <Jext c={white}>{__t('rate')}</Jext>
          <Parallelogram
            pressed={active === '+'}
            onPress={this.handlePress(onLike, '+')}
            label='+'
            labelStyle={{
              color: white,
              fontSize: 18,
            }}
            style={{
              backgroundColor: active === '+' ? darkenedGreen : green,
              width: width * 0.1,
              padding: 5,
              marginRight: 10,
              height: 40,
            }}
          />
          <Parallelogram
            onPress={this.handlePress(onDislike, '-')}
            pressed={active === '-'}
            label='-'
            labelStyle={{
              color: white,
              fontSize: 18,
            }}
            reverse
            style={{
              backgroundColor: active === '-' ? darkenedRed : red,
              width: width * 0.1,
              padding: 5,
              marginRight: 10,
              height: 40,
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  coinsWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    height: 30,
    width: 120,
  },
  coinField: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

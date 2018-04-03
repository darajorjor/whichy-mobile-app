import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native'
import Pressable from 'src/common/Pressable'
import { white, green } from 'src/theme'
import Jext from 'src/common/Jext'
import coin from 'src/common/icons/coin-1.png'
import { isRTL } from 'src/utils/i18n'

const { width } = Dimensions.get('window')


const BuyCoin = ({ onPress }) => (
  <Pressable onPress={onPress} style={styles.wrapper} transforms={[{ skewX: '-10deg' }]}>
    <View style={styles.innerWrapper}>
      <Jext c={white} f={width < 400 ? 14 : 18}>{ __t('menu.buy_coin') }</Jext>
      <Image
        source={coin}
        style={{
          width: 21,
          height: 21,
          marginHorizontal: 5
        }}
      />
    </View>
  </Pressable>
)

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    padding: 10,
    backgroundColor: green,
    borderRadius: 5,
    end: -10,
    paddingEnd: 20,
  },
  innerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingEnd: 15,
    // paddingStart: 20,
    paddingVertical: 13,
    transform: [{
      skewX: '10deg'
    }],
    flexDirection: isRTL ? 'row-reverse' : 'row',
  }
})

export default BuyCoin

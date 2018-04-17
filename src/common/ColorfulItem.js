import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Pressable from 'src/common/Pressable'
import Jext from 'src/common/Jext'
import CoinsImage from 'src/common/icons/coin-2.png'
import OkImage from 'src/common/icons/ok.png'
import { white } from 'src/theme'

const ColorfulItem = ({ style, title, titleStyle, price, backgroundColor, onPress, bought, disabled }) => (
  <TouchableOpacity
    style={[{ backgroundColor: disabled ? '#ddd' : backgroundColor }, styles.wrapper, style]}
    activeOpacity={disabled ? 1 : 0.7}
    onPress={disabled ? null : onPress}
  >
    <Jext bold c={white} style={[{ top: -3 }, titleStyle]}>{title}</Jext>
    <View style={styles.square}>
      <Jext>{price}</Jext>
      <Image
        source={bought ? OkImage : CoinsImage}
        style={{
          width: 19,
          height: 19,
        }}
      />
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 4,
    padding: 16,
    minHeight: 55,
    paddingRight: 64,
    justifyContent: 'center',
    marginTop: 10,
  },
  square: {
    position: 'absolute',
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ColorfulItem

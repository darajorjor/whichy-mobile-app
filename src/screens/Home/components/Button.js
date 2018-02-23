import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Pressable from 'src/common/Pressable'
import Jext from 'src/common/Jext'
import { white } from 'src/theme'

const Button = ({ style, title, onPress, gradientColors }) => (
  <Pressable style={style} onPress={onPress}>
    <LinearGradient
      colors={gradientColors}
      style={[styles.wrapper]}
    >
      <Jext f={24} c={white}>{ title }</Jext>
    </LinearGradient>
  </Pressable>
)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Button

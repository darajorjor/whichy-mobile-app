import React from 'react'
import {
  StyleSheet,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Pressable from 'src/common/Pressable'
import Jext from 'src/common/Jext'
import { white } from 'src/theme'

const Button = ({ style, title, titleStyle, onPress, disabled, gradientColors }) => (
  <Pressable disabled={disabled} style={[{ borderRadius: 10 }, style]} onPress={onPress}>
    <LinearGradient
      colors={disabled ? ['#ddd', '#ccc'] : gradientColors}
      style={[styles.wrapper]}
    >
      {
        typeof title === 'string'
          ? <Jext f={24} c={white} style={[{ top: -3 }, titleStyle]}>{ title }</Jext>
          : title
      }
    </LinearGradient>
  </Pressable>
)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Button

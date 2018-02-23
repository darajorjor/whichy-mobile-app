import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import Pressable from 'src/common/Pressable'
import Jext from 'src/common/Jext'

const { height } = Dimensions.get('window')

const Card = ({ title, body, textColor, backgroundColor }) => (
  <Pressable>
    <Animatable.View style={[styles.wrapper, { backgroundColor }]}>
      <Jext f={24} c={textColor} style={{ position: 'absolute', top: 16 }}>{ title }</Jext>
      <Jext f={18} c={textColor}>{ body }</Jext>
    </Animatable.View>
  </Pressable>
)

const styles = StyleSheet.create({
  wrapper: {
    height: 0.3 * (height - 70),
    alignSelf: 'stretch',
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Card

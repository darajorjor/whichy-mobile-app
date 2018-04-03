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

function getCardFontSize(text) {
  if (text.length > 80) {
    return 12
  }

  return 18
}

const Card = ({ title, body, textColor, backgroundColor, style }) => (
  <Animatable.View style={[styles.wrapper, { backgroundColor }, style]}>
    <Jext f={24} c={textColor} style={{ position: 'absolute', top: 10 }}>{ title }</Jext>
    {
      typeof body === 'string'
        ? <Jext f={getCardFontSize(body)} c={textColor} style={{ top: 20 }}>{ body }</Jext>
        : body
    }

  </Animatable.View>
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

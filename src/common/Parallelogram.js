import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import Pressable from 'src/common/Pressable'
import Jext from 'src/common/Jext'

const Parallelogram = ({ label, labelStyle, onPress, pressed, style }) => {
  let Wrapper = View
  if (onPress) {
    Wrapper = Pressable
  }

  return (
    <Wrapper pressed={pressed} onPress={onPress} style={[styles.wrapper, style]} transforms={[{
      skewX: '-10deg'
    }]}>
      <View style={styles.innerWrapper}>
        <Jext bold style={labelStyle}>{ label }</Jext>
      </View>
    </Wrapper>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
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
  }
})

export default Parallelogram

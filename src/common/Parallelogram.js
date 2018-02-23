import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import Jext from 'src/common/Jext'

const Parallelogram = ({ label, labelStyle, style, wrapperStyle }) => (
  <View style={[styles.wrapper, style]}>
    <View style={styles.innerWrapper}>
      <Jext bold style={labelStyle}>{ label }</Jext>
    </View>
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    transform: [{
      skewX: '-10deg'
    }],
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

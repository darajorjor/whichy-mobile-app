import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

const Ad = ({ width, height }) => (
  <View style={[styles.wrapper, { width, height }]}>

  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000'
  },
})

export default Ad

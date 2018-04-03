import React from 'react'
import {
  Image,
  StyleSheet,
} from 'react-native'
import BGImage from 'src/common/icons/bg1.jpg'

const BG = () => (
  <Image
    source={BGImage}
    style={styles.wrapper}
  />
)

const styles = StyleSheet.create({
  wrapper: {
    zIndex: -9,
  },
})

export default BG

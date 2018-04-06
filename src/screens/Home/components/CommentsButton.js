import React from 'react'
import {
  View,
  StyleSheet,
  Image,
} from 'react-native'
import { lightGreen, white } from 'src/theme'
import Pressable from 'src/common/Pressable'
import Jext from 'src/common/Jext'
import coin from 'src/common/icons/coin-1.png'
import { isRTL } from 'src/utils/i18n'

const options = {
  coins: 5,
}

const CommentsButton = ({ onPress }) => (
  <Pressable onPress={onPress} style={styles.wrapper}>
    <View style={styles.innerWrapper}>
      <Jext c={white} bold>{ __t('comments') }</Jext>
    </View>
  </Pressable>
)

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    padding: 10,
    transform: [{
      skewX: '-10deg'
    }],
    backgroundColor: lightGreen,
    borderRadius: 5,
    end: -10,
    paddingEnd: 20
  },
  innerWrapper: {
    flex: 1,
    transform: [{
      skewX: '10deg'
    }],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: isRTL ? 'row-reverse' : 'row',
  },
})

export default CommentsButton

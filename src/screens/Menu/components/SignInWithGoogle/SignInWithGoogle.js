import React from 'react'
import {
  View,
  StyleSheet,
  Image,
} from 'react-native'
import { white } from 'src/theme'
import Jext from 'src/common/Jext'
import Pressable from 'src/common/Pressable'
import googleIcon from './assets/google.jpg'

const SignInWithGoogle = ({ style, onPress }) => (
  <Pressable style={style} onPress={onPress}>
    <View style={styles.wrapper}>
      <Image
        source={googleIcon}
        style={{
          width: 18,
          height: 18,
        }}
      />
      <Jext style={{ marginLeft: 10 }}>{__t('menu.login_with_google')}</Jext>
    </View>
  </Pressable>
)

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    alignSelf: 'stretch',
    backgroundColor: white,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row'
  },
})

export default SignInWithGoogle

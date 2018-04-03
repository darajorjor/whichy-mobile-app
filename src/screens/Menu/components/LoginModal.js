import React from 'react'
import {
  View,
  Modal,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native'
import { grey, white, lightGreen } from 'src/theme'
import Jext from 'src/common/Jext'
import Button from 'src/common/Button'
import SignInWithGoogle from './SignInWithGoogle'

const { width } = Dimensions.get('window')

const LoginModal = (props) => (
  <Modal
    animationType={'slide'}
    transparent
    {...props}
  >
    <KeyboardAvoidingView
      behavior='position'
      keyboardVerticalOffset={-150}
      style={styles.wrapper}
    >
      <TouchableOpacity
        onPress={props.onRequestClose}
        style={{
          position: 'absolute',
          left: 10,
          top: 10,
          zIndex: 99,
        }}
      >
        <Jext c={white}>بستن</Jext>
      </TouchableOpacity>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <View
          style={styles.container}
        >
          <Jext
            f={20}
            c={white}
            style={{
              textAlign: 'center'
            }}
          >{__t('menu.login_or_register')}</Jext>

          <SignInWithGoogle
            onPress={props.onGoogleLogin}
            style={{
              paddingTop: 16,
            }}
          />

          <View style={styles.or}>
            <Jext f={12} c={white}>{__t('or')}</Jext>
          </View>

          <View>
            <TextInput
              placeholder={__t('menu.enter_email')}
              style={{
                padding: 10,
                backgroundColor: white,
                borderRadius: 5,
                fontFamily: 'IRANYekanFaNum'
              }}
            />
          </View>

          <Button
            title={__t('menu.login')}
            onPress={null}
            gradientColors={[lightGreen, lightGreen]}
            style={{
              position: 'absolute',
              bottom: 32,
              left: 32,
              right: 32,
              height: 50,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </Modal>
)

export default LoginModal

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,0, 0.3)'
  },
  container: {
    width: width - 32,
    height: width - 32,
    backgroundColor: grey,
    padding: 32,
    borderWidth: 2,
    borderColor: white,
    borderRadius: 5,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: 'rgb(66,66,66)',
    shadowOffset: {
      height: 5,
      width: 0
    },
    elevation: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },
  or: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
})

import React from 'react'
import {
  View,
  StyleSheet,
  Keyboard,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import Jext from 'src/common/Jext'
import { white } from 'src/theme'

const { width, height } = Dimensions.get('window')

const CommentsModal = (props) => (
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
          zIndex: 99999,
          elevation: 2,
        }}
      >
        <Jext>بستن</Jext>
      </TouchableOpacity>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <View
          style={styles.container}
        >
          <Jext bold>{ __t('share') }</Jext>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </Modal>
)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,0, 0.3)'
  },
  container: {
    width: width - 32,
    height: height - 150,
    backgroundColor: white,
    paddingTop: 64,
    padding: 32,
    borderRadius: 5,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: 'rgb(66,66,66)',
    shadowOffset: {
      height: 2,
      width: 0
    },
    elevation: 2,
    overflow: 'hidden'
  },
})

export default CommentsModal

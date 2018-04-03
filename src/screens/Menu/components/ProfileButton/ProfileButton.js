import React, { PureComponent } from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { yellow, white, } from 'src/theme'
import Parallelogram from 'src/common/Parallelogram'
import AvatarImage from './assets/default-avatar.png'

const { width } = Dimensions.get('window')

const options = {
  shadowColor: 'rgba(66,66,66, 0.5)'
}

export default class ProfileButton extends PureComponent {
  state = {
    shadowVisible: true,
  }

  handlePressIn = () => this.setState({ shadowVisible: false })
  handlePressOut = () => this.setState({ shadowVisible: true })

  render() {
    const { shadowVisible } = this.state
    const { onPress, disabled } = this.props

    return (
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={1}
        onPress={disabled ? null : onPress}
        onPressIn={disabled ? null : this.handlePressIn}
        onPressOut={disabled ? null : this.handlePressOut}
      >
        <Parallelogram
          label={__t('menu.login')}
          labelStyle={{
            fontSize: 18,
            marginRight: 32,
          }}
          style={[
            {
              backgroundColor: disabled ? '#ddd' : yellow,
              width: width <= 320 ? 110 : 150,
              padding: 5,
              height: 40,
            },
            shadowVisible ? styles.boxShadow : {
              transform: [
                {
                  translateY: 2
                },
                {
                  skewX: '-10deg'
                }
              ],
            },
          ]}
        />

        <View
          style={[
            styles.circle,
            shadowVisible ? styles.boxShadow : styles.poppedUp,
            { backgroundColor: disabled ? '#ddd' : yellow },
          ]}
        >
          <Image
            source={AvatarImage}
            style={styles.img}
          />
          <View style={[styles.glue, { backgroundColor: disabled ? '#ddd' : yellow }]} />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingRight: 20,
    paddingTop: 18,
    paddingBottom: 18,
    top: -18,
    // top: -19,
    // marginTop: 19,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 99,
  },
  glue: {
    position: 'absolute',
    left: -5,
    top: 18,
    // top: 0,
    backgroundColor: yellow,
    width: 20,
    height: 34,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: yellow,
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxShadow: {
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowColor: options.shadowColor,
    shadowOffset: {
      height: 3,
      width: 0
    },
  },
  poppedUp: {
    transform: [
      {
        translateY: 2
      },
    ],
  },
})


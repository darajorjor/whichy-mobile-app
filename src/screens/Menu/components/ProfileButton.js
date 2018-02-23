import React, { PureComponent } from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { yellow, white, } from 'src/theme'
import Parallelogram from 'src/common/Parallelogram'

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

    return (
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={1}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Parallelogram
          label={__t('menu.your_profile')}
          onPress={() => {
          }}
          labelStyle={{
            fontSize: 18,
            marginRight: 32,
          }}
          style={[
            {
              backgroundColor: yellow,
              width: 150,
              padding: 5,
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

        <View style={[styles.circle, shadowVisible ? styles.boxShadow : styles.poppedUp]}>
          <Image
            source={{ uri: 'https://pbs.twimg.com/profile_images/822299289959469056/_ZF7RNPe_400x400.jpg' }}
            style={styles.img}
          />
          <View style={styles.glue}>

          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    // top: -19,
    // marginTop: 19,
    // backgroundColor: 'red',
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
    top: 21,
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
    right: -32,
    top: -19,
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


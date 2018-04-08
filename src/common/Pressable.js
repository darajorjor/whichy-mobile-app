import React, { PureComponent } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
} from 'react-native'

const options = {
  shadowColor: 'rgba(66,66,66, 0.5)'
}

export default class Pressable extends PureComponent {
  state = {
    shadowVisible: true,
  }

  handlePressIn = () => this.setState({ shadowVisible: false })
  handlePressOut = () => this.setState({ shadowVisible: true })

  render() {
    const { children, style, pressed, disabled, onPress, transforms = [], ...otherProps } = this.props
    let { shadowVisible } = this.state

    if (pressed) {
      shadowVisible = false
    }

    return (
      <View style={[
        shadowVisible ? styles.boxShadow : styles.poppedUp,
        style,
        { transform: shadowVisible ? transforms : [...transforms, { translateY: 2 }] },
      ]}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={disabled ? null : this.handlePressIn}
          onPressOut={disabled ? null : this.handlePressOut}
          onPress={disabled ? null : onPress}
          {...otherProps}
          style={[
            { flex: 1, },
          ]}
        >
          {children}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  boxShadow: {
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowColor: options.shadowColor,
    shadowOffset: {
      height: 3,
      width: 0
    },
    borderBottomWidth: Platform.select({ android: 3 }),
    borderBottomColor: Platform.select({ android: options.shadowColor }),
  },
  poppedUp: {
    borderBottomWidth: Platform.select({ android: 3 }),
    borderBottomColor: Platform.select({ android: 'transparent' }),
  },
})

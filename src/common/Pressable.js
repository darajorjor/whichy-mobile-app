import React, { PureComponent } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
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
    const { children, style, ...otherProps } = this.props
    const { shadowVisible } = this.state

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        {...otherProps}
        style={[
          shadowVisible ? styles.boxShadow : styles.poppedUp,
          style
        ]}
      >
        { children }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
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
    transform: [{
      translateY: 2
    }],
  },
})

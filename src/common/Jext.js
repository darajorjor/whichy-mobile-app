import React from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    fontFamily: 'IRANYekanFaNum',
    backgroundColor: 'transparent',
    // fontSize: 14,
    color: '#424242',
    textAlign: 'right',
    maxWidth: width - 32
  },
  onPress: {
    color: 'red',
  }
});

const Jext = ({ style, children, numberOfLines, onPress, autoAdjust, f, c, bold }) => (
  <Text
    allowFontScaling={false}
    numberOfLines={numberOfLines}
    onPress={onPress}
    // pointerEvents={onPress ? 'auto' : 'none'}
    style={[
      styles.wrapper,
      onPress ? styles.onPress : undefined,
      {
        fontSize: f ? f : 14,
        color: c ? c : '#424242',
        fontWeight: bold ? 'bold': undefined
      },
      style,
    ]}
  >{ children }</Text>
)

export default Jext

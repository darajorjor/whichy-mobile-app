import React from 'react';
import { TouchableOpacity, Keyboard } from 'react-native';

export default (Comp) => {
  const FinalComponent = ({ children, ...props }) => (
    <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <Comp {...props}>
        {children}
      </Comp>
    </TouchableOpacity>
  )

  FinalComponent.navigationOptions = Comp.navigationOptions

  return FinalComponent;
};
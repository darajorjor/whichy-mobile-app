import Toast from 'react-native-root-toast'

export default (text) => Toast.show(text, {
  duration: Toast.durations.SHORT,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
})

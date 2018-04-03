import {
  AsyncStorage,
  Platform,
} from 'react-native'
import storageConstants from 'src/constants/storage.constant'
import DeviceInfo from 'react-native-device-info'

export default {
  async handleDeviceRegistration(registerDevice, setParams) {
    const deviceToken = await AsyncStorage.getItem(storageConstants.DEVICE_TOKEN)
    const session = await AsyncStorage.getItem(storageConstants.SESSION)

    if (!deviceToken || !session) {
      setParams({
        headerHidden: true,
      })

      return registerDevice({
        body: {
          uniqueId: DeviceInfo.getUniqueID(),
          type: String(Platform.OS).toUpperCase(),
          appVersion: `${DeviceInfo.getVersion()}`,
          // oneSignalPushId: ids ? ids.userId : undefined,
          deviceInfo: {
            os: DeviceInfo.getSystemName(),
            sdk: DeviceInfo.getSystemVersion(),
          }
        },
      })
        .then(async ({ token, session }) => {
          await AsyncStorage.setItem(storageConstants.DEVICE_TOKEN, token)
          await AsyncStorage.setItem(storageConstants.SESSION, session)

          return true
        })
    }

    return false
  }
}
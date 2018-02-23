import React, { PureComponent } from 'react'
import {
  View,
} from 'react-native'
import { orange, white, green } from 'src/theme'
import AppHeader from 'src/common/AppHeader'
import BuyCoin from './components/BuyCoin'
import Parallelogram from 'src/common/Parallelogram'
import ProfileButton from './components/ProfileButton'
import Pressable from 'src/common/Pressable'

export default class Menu extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <AppHeader
        navigation={navigation}
        type="lang"
        totalCoins={1200}
      >
        <BuyCoin />
      </AppHeader>
    )
  })

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: orange }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 19, paddingRight: 30 }}>
          <Pressable>
            <Parallelogram
              label={__t('menu.write_what_if')}
              onPress={() => {
              }}
              labelStyle={{
                color: white,
                fontSize: 18,
              }}
              style={{
                backgroundColor: green,
                width: 130,
                padding: 5,
                marginRight: 16,
              }}
            />
          </Pressable>
          <ProfileButton />
        </View>
      </View>
    )
  }
}

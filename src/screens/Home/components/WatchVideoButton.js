import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native'
import config from 'src/config'
import { yellow } from 'src/theme'
import Pressable from 'src/common/Pressable'
import Jext from 'src/common/Jext'
import coin from 'src/common/icons/coin-1.png'
import { isRTL } from 'src/utils/i18n'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import { showAd } from 'src/utils/ad'

const { width } = Dimensions.get('window')

@connect(
  state => ({
    videoAdId: state.Main.videoAdId,
  })
)
export default class WatchVideoButton extends PureComponent {
  onPress = () => {
    showAd(this.props.videoAdId)
  }

  render() {
    const { videoAdId } = this.props

    if (!videoAdId) return (
      <View style={[styles.wrapper, { width: 130, backgroundColor: 'transparent' }]} />
    )

    return (
     <Animatable.View animation='slideInRight' duration={400}>
       <Pressable onPress={this.onPress} style={styles.wrapper} transforms={[{ skewX: '-10deg' }]}>
         <View style={styles.innerWrapper}>
           <Jext f={width < 400 ? 12 : 14} bold>{__t('watch_video')} +{config.values.videoPrize}</Jext>
           <Image
             source={coin}
             style={{
               width: 21,
               height: 21,
               marginHorizontal: 5
             }}
           />
         </View>
       </Pressable>
     </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    padding: 10,
    backgroundColor: yellow,
    borderRadius: 5,
    end: -10,
    paddingEnd: 20
  },
  innerWrapper: {
    flex: 1,
    transform: [{
      skewX: '10deg',
    }],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: isRTL ? 'row-reverse' : 'row',
  },
})

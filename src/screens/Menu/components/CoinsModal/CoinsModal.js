import React, { PureComponent } from 'react'
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { grey, white, lightGreen, blue, darkGreen, darkRed, purple } from 'src/theme'
import Jext from 'src/common/Jext'
import Button from 'src/common/Button'
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view'
import ColorfulItem from 'src/common/ColorfulItem'
// import Tapsell, { ROTATION_LOCKED_PORTRAIT } from 'react-native-tapsell'
import { connect } from 'react-redux'
import { TabViewAnimated, TabBar, SceneMap, TabViewPagerScroll, TabViewPagerPan } from 'react-native-tab-view'
import { showAd } from 'src/utils/ad'

const { width, height } = Dimensions.get('window')

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
}

@connect(
  state => ({
    videoAdId: state.Main.videoAdId,
  })
)
export default class CoinsModal extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'سکه رایگان' },
      { key: 'second', title: 'خرید سکه' },
    ],
  }

  _renderPager = (props) => {
    return (Platform.OS === 'ios') ? <TabViewPagerScroll {...props} /> : <TabViewPagerPan {...props}/>
  }

  _handleIndexChange = index => this.setState({ index })

  _renderHeader = props => <TabBar
    labelStyle={{ fontFamily: 'IRANYekanFaNum', color: '#000' }}
    style={{
      backgroundColor: '#fff',
    }}
    indicatorStyle={{
      backgroundColor: '#000'
    }}
    {...props}
  />

  _renderScene = SceneMap({
    first: () => <ScrollView tabLabel='سکه رایگان'>
      {
        !!this.props.videoAdId &&
        <ColorfulItem
          title={__t('coins_modal.watch_video')}
          price={5}
          backgroundColor={blue}
          onPress={() => {
            props.onRequestClose()
            setTimeout(() => {
              showAd(this.props.videoAdId)
            }, 500)
          }}
        />
      }
      <ColorfulItem
        title={__t('coins_modal.review_whichy')}
        price={100}
        backgroundColor={darkGreen}
        disabled
      />
      <ColorfulItem
        title={__t('coins_modal.share_instagram')}
        price={100}
        backgroundColor={purple}
        disabled
      />
      <ColorfulItem
        title={__t('coins_modal.tweet_whichy')}
        price={150}
        backgroundColor={darkRed}
        disabled
      />
    </ScrollView>,
    second: () => <ScrollView tabLabel='خرید سکه'>
      <ColorfulItem
        title={__t('coins_modal.buy_100')}
        price={100}
        backgroundColor={blue}
        onPress={() => this.props.onCoinPurchase(100)}
      />
      <ColorfulItem
        title={__t('coins_modal.buy_500')}
        price={500}
        backgroundColor={darkGreen}
        onPress={() => this.props.onCoinPurchase(500)}
      />
      <ColorfulItem
        title={__t('coins_modal.buy_1000')}
        price={1000}
        backgroundColor={purple}
        onPress={() => this.props.onCoinPurchase(1000)}
      />
      <ColorfulItem
        title={__t('coins_modal.buy_10000')}
        price={10000}
        backgroundColor={darkRed}
        onPress={() => this.props.onCoinPurchase(10000)}
      />
    </ScrollView>,
  })

  render() {
    const { videoAdId, onCoinPurchase, ...props } = this.props

    return (
      <Modal
        animationType={'slide'}
        transparent
        {...props}
      >
        <KeyboardAvoidingView
          behavior='position'
          keyboardVerticalOffset={-150}
          style={styles.wrapper}
        >
          <TouchableOpacity
            onPress={props.onRequestClose}
            style={{
              position: 'absolute',
              left: 10,
              top: 10,
              zIndex: 99999,
              elevation: 2,
            }}
          >
            <Jext>بستن</Jext>
          </TouchableOpacity>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
          >
            <View
              style={styles.container}
            >
              <TabViewAnimated
                navigationState={this.state}
                renderScene={this._renderScene}
                renderPager={this._renderPager}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,0, 0.3)'
  },
  container: {
    width: width - 32,
    height: height - 150,
    backgroundColor: white,
    paddingTop: 32,
    padding: 16,
    borderRadius: 5,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: 'rgb(66,66,66)',
    shadowOffset: {
      height: 2,
      width: 0
    },
    elevation: 2,
    overflow: 'hidden'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  }
})
